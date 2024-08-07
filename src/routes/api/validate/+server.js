import { BOT_KEY } from '$env/static/private'
import { json } from '@sveltejs/kit'
import { createHmac } from 'crypto'
import { encrypt } from '$server/auth.js'
import { pb } from '$server/db.js'
import { dev } from '$app/environment'

const cookieOptions = {
	path: '/',
	httpOnly: true,
	secure: dev ? false : true,
	sameSite: 'lax' //web 'none'? czy po prostu 'lax'
}

export const POST = async ({ request, cookies }) => {
	cookies.delete('session', cookieOptions)
	let valid
	let userData = {}

	try {
		const toValidate = await request.text()
		const parsed = new URLSearchParams(toValidate)

		if(!parsed.has('hash')) {
			return json({ error: 'wrong init data' })
		}
	
		const hash = parsed.get('hash')
		parsed.delete('hash')
		const dataCheck = Array.from(parsed.keys())
			.sort()
			.map(key => `${key}=${parsed.get(key)}`)
			.join('\n')
	
		const secretKey = createHmac('sha256', 'WebAppData').update(BOT_KEY).digest()
		const calculatedHash = createHmac('sha256', secretKey).update(dataCheck).digest('hex')
		valid = calculatedHash === hash
		//TODO! session timeout

		if(valid) {
			const { user: userStr } = Object.fromEntries(parsed.entries())
			const user = JSON.parse(userStr)

			delete user.language_code
			delete user.allows_write_to_pm
			
			userData = {
				telegramID: user.id,
				telegramUsername: user.username,
			}

			try {
				const getUser = await pb.collection('Users').getFirstListItem(`telegramID="${user.id}"`)
				const { id, isSage, xUsername, isWalletLinked, memberships, gatherings } = getUser

				userData = {
					...userData,
					dbID: id,
					xUsername: xUsername ? xUsername : undefined,
					isSage,
					isWalletLinked,
					memberships,
					gatherings
				}
				const session = await encrypt(JSON.stringify(userData))

				cookies.set('session', session, cookieOptions)

				return json({
					valid,
					...userData
				})
			} catch(dbError) {
				if(dbError.status !== 404) {
					console.log('dbError', dbError)
				} else {
					const session = await encrypt(JSON.stringify({
						...userData,
						isSage: false,
						isWalletLinked: false,
						memberships: [],
						gatherings: []
					}))
					cookies.set('session', session, cookieOptions)
					
					return json({
						valid,
						...userData,
						isSage: false,
						isWalletLinked: false,
						memberships: [],
						gatherings: []
					})
				}
			}
		} else {
			console.log('!valid', userData)
			cookies.delete('session', cookieOptions)
			return json({ valid })
		}

	} catch(validationError) {
		return json({ error: 'invalid' })
	}
}