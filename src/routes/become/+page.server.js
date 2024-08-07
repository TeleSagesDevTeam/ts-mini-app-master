import { redirect } from '@sveltejs/kit'
import { encrypt, genSecureRandom } from '$server/auth.js'

/** @type {import('./$types').PageLoad} */
export const load = async ({ locals }) => {
	if(!locals.user) return {}

	const {
		dbID,
		telegramID, telegramUsername,
		xUsername
	} = locals.user ?? {}

	let step = 'linkWallet'
	let userStatus = null
	let secretCode = ''
	let verifyWhat = ''
	let verifyProof = ''

	try {
		if(dbID) userStatus = await locals.pb.collection('UserStats').getOne(dbID)
	} catch(becomeLoad) {
		if(becomeLoad.status === 404 && becomeLoad.response.code === 404) {
		} else {
			console.error({ becomeLoad })
			//TODO: report
		}
	}
	
	const { isWalletLinked, ogGroupVerified, xVerified, walletAddress } = userStatus ?? {}

	//wallet linked but no OG verified
	if(isWalletLinked && !ogGroupVerified) {
		step = 'linkOG'
		const { toProve } = await locals.pb.collection('Users').getOne(dbID)

		if(toProve) [verifyWhat, verifyProof] = toProve.split('=')
		else {
			verifyWhat = 'telegram'
			verifyProof = genSecureRandom()
			try {
				await locals.pb.collection('Users').update(dbID, {
					toProve: `${verifyWhat}=${verifyProof}`
				})
			} catch(dbToProveError) {
				//TODO: report
			}
		}
	}

	// wallet linked and og verified
	if(isWalletLinked && ogGroupVerified) {
		try {
			const sageGatherings = await locals.pb.collection('Gatherings').getFullList(`sage="${dbID}"`)

			let gatheringID, action

			sageGatherings.some(item => {
				if(item.telegramID.includes('verify')) {
					gatheringID = item.telegramID
					secretCode = gatheringID?.split(':')[1]
					action = 'createGathering'
					return true
				}
			})

			if(!gatheringID) {
				sageGatherings.some(item => {
					if(item.poolIndex < 0) {
						action = 'setupGathering'
						return true
					}
				})

				if(!action) {
					action = 'createGathering'
					secretCode = genSecureRandom()

					await locals.pb.collection('Gatherings').create({
						sage: dbID,
						telegramID: `verify:${secretCode}`,
						poolIndex: -1
					})
				}
			}

			step = action

			// sageGatherings.some(item => {
			// 	if(item.telegramID.includes('verify')) {
			// 		secretCode = telegramID?.split(':')[1]
			// 		step = 'createGathering'
			// 		return true
			// 	}
			// })

			// if(!secretCode) {
			// 	sageGatherings.some(item => {
			// 		if(item.poolIndex < 0) {
			// 			step = 'setupGathering'
			// 			return true
			// 		}
			// 	})

			// 	if(step !== 'setupGathering') {

					// await locals.pb.collection('Gatherings').create({
					// 	sage: dbID,
					// 	telegramID: `verify:${genSecureRandom()}`,
					// 	poolIndex: -1
					// })

			// 		step = 'createGathering'
			// 	}
			// }

			// console.log(sageGatherings)
			// const telegramID = 'asd'
			// if(telegramID.includes('verify')) {

			// } else {
			// 	step = 'setupGathering'
			// }
		} catch(errorEmptyGatheringExists) {
		}
	}



	const x = await encrypt(JSON.stringify({
		dbID,
		telegramID,
		telegramUsername,
		xUsername: xVerified ? xUsername : undefined,
		from: 'becomeSage',
		walletAddress
	}))

	return {
		step,
		telegramUsername,
		xUsername: xVerified ? xUsername : undefined,
		x,
		toProve: {
			what: verifyWhat,
			proof: verifyProof
		},
		secretCode
	}

}

export const actions = {
	linkWallet: async ({ locals, request }) => {
		const formData = await request.formData()
		const platform = formData.get('platform')

		const x = encrypt(platform)

		redirect(307, 'https://');
	}
}