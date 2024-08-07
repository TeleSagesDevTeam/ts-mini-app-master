import { encrypt } from '$server/auth.js'
import { currentPrice } from '$lib/logic.js'

/** @type {import('./$types').PageLoad} */
export const load = async ({ locals, params }) => {



    try {
        const userDbID = locals.user.dbID
        const gathering = await locals.pb.collection('GatheringStats')
            .getOne(params.id, { expand: 'gatheringID' })


        const isMemberOf = !!(await locals.pb.collection('InvitationLinks')
            .getList(1, 1, {
                filter: `gatheringID = '${params.id}' && userID = '${userDbID}' && status != 'revoked' `,
            })).totalItems

        const { ogGroupName } = await locals.pb.collection('Users').getOne(gathering.sageID)

        const {
            name, description, poolIndex, sageWalletAddress,
            currentSupply, totalBuys, totalSells, timeSinceLastTrade,
            volumeETH1H, supplyChange1H, totalETHvolume, 
            priceCurve, multiParam, flatParam
        } = gathering

        return {
            name, description, currentSupply,
            timeSinceLastTrade, totalBuys, totalSells,
            volumeETH1H, supplyChange1H, totalETHvolume,
            price: currentPrice(priceCurve, multiParam, flatParam, currentSupply),
            isMemberOf, ogGroupName,
            x: await encrypt(JSON.stringify({
                sageWalletAddress, poolIndex,
                userDbID,
                gatheringDbID: gathering.id
            }))
        }

    } catch(error) {
        console.error(`errorLoad:/gatherings/id/${params.id}`, error)
    }
}

export const actions = {
    getPrice: async ({ locals, params }) => {

    }
}