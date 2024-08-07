/** @type {import('./$types').PageLoad} */
export const load = async ({ locals }) => {
	try {
		const { dbID, telegramUsername } = locals.user
		const { walletAddress } = await locals.pb.collection('Users').getOne(dbID)

		const activeInvites = await locals.pb.collection('InvitationLinks').getFullList({
			filter: `status != 'revoked' && userID = '${dbID}'`,
			expand: 'gatheringID'
		})
		
		const joined = activeInvites.reduce((acc, curr) => {
			if(!acc.map.has(curr.gatheringID)) {
				acc.map.set(curr.gatheringID, true)
				acc.result.push(curr.expand.gatheringID)
			}

			return acc
		}, { map: new Map(), result: [] }).result

		const gatherings = await locals.pb.collection('GatheringStats').getFullList({
			filter: `sageID = '${dbID}'`
		})

		return {
			telegramUsername,
			walletAddress,
			joined,
			gatherings
		}
	} catch(err) {
		console.error(err)
	}
	

}