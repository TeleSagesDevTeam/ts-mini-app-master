import { dev } from '$app/environment'
import { goto } from '$app/navigation'

export const init = async initDataUnsafe => {
	let initData = ''
	if (dev) {
		// initData = 'query_id=AAFctaV8AgAAAFy1pXym1saD&user=%7B%22id%22%3A6386201948%2C%22first_name%22%3A%22Shu%22%2C%22last_name%22%3A%22Ib%22%2C%22username%22%3A%22shuib420%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1699340126&hash=a8514fbaf72042729d45fa86b2c54b852a4851775e8b10b69bea172ee36a0bb7'
		initData = 'query_id=AAFrI3J6AgAAAGsjcnqM_Sec&user=%7B%22id%22%3A6349267819%2C%22first_name%22%3A%22Song.dev%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Bcfusdev%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1722516596&hash=d1e461286fae7b604cc0ae7e3c2bdd5c1f07290630666461933051ac54ca4c47'
	}else {
		initDataUnsafe.user = JSON.stringify(initDataUnsafe.user)
		initData = new URLSearchParams(initDataUnsafe).toString()
	}

	console.log(initData);
	try {
		if (!initData) {
			throw Error('invalid data');
		}

		const req = await fetch('/api/validate', {
			method: 'POST',
			body: String(initData)
		})

		const validation = await req.json()
		return validation
	} catch (error) {
		console.error('initDataError', error)
	}
}
export const truncateAddr = (addr, len = 9) => addr.substring(0, len) + '...' + addr.substring(addr.length - len)
export const formatPrice = _ => {
	const e = _.toExponential(5)

	if (e.includes('-')) {
		const [n, z] = e.split('e-')
		if (z > 4) return `0.0<sub>${z - 1}</sub>${n.split('.').join('').replace(/\.?0*$/, '')}`
		else return _.toPrecision(4).toString().replace(/\.?0*$/, '')
	} else {
		const [main, deci] = _.toString().split('.')
		if (main.length > 4) return main
		else return _.toFixed(6 - main.length)
	}
}

/**
 * Calculates the next key price based on the provided curve type, parameters, and supply.
 *
 * @param {number} curveType - The type of curve to apply for pricing.
 * @param {number} multiParam - The multiplier parameter for the pricing calculation.
 * @param {number} flatParam - The flat rate parameter for the pricing calculation.
 * @param {number} supply - The current supply of keys.
 *
 * @returns {string} The formatted price of the next key.
 */
export const currentPrice = (curveType, multiParam, flatParam, supply) => {
	let price = 0
	supply++
	if (curveType === 0) price = flatParam
	if (curveType === 1) price = (flatParam + multiParam * supply) * 1.1 //5% protocol + 5%subject tax
	if (curveType === 2) {
		let sum1 = (supply - 1) * supply * (2 * (supply - 1) + 1) / 6
		let sum2 = supply * (supply + 1) * (2 * supply + 1) / 6

		price = (multiParam * (sum2 - sum1) + flatParam) * 1.1 //5% protocol + 5%subject tax
	}

	return formatPrice(price)
}

export const formatTime = seconds => {
	const hours = Math.floor(seconds / 3600)
	const minutes = Math.floor((seconds % 3600) / 60)
	const remainingSeconds = seconds % 60

	const formattedHours = String(hours).padStart(2, '0')
	const formattedMinutes = String(minutes).padStart(2, '0')
	const formattedSeconds = String(remainingSeconds).padStart(2, '0')

	return seconds ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}` : '--'
}

export const getMetamaskLink = (platform, where, x) => {
	const dappLink = `http://localhost:5174/${where}`

	if (platform === 'ios') return `https://metamask.app.link/dapp/${dappLink}/?x=${x}`
	if (platform === 'android') return `https://metamask.app.link/dapp/${dappLink}/?x=${x}`
	if (dev) return `http://localhost:5174/${where}?x=${x}`

	return `https://${dappLink}?x=${x}`
}
export const navBack = () => goto('/') //window.history.length ? window.history.back() : window.location = '/'