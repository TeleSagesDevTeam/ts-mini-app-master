export const ssr = false

/** @type {import('./$types').PageLoad} */
export const load = async ({ locals }) => {
	try {
		const gatherings = await locals.pb.collection('GatheringStats')
			.getList(1, 50, {
				sort: '-volumeETH1H',
				fields: 'id,name,currentSupply,flatParam,multiParam,priceCurve'
			})
		
		const { page, perPage, totalItems, items } = gatherings ?? {}

			return {
				page,
				perPage,
				totalItems,
				gatherings: items
			}
	} catch(err) {
		console.error('errorLoad:/', err)
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ locals, request }) => {
		let sortType
		try {
			sortType = await request.text()
		} catch(formDataError) {
			console.log({ formDataError }) //TODO
			return {}
		}

		if(sortType) {
			try {
				let sort = ''
				if(sortType === 'new') sort = '-created'
				if(sortType === 'trending') sort = '-volumeETH1H'
				if(sortType === 'top') sort = '-totalETHvolume,-currentSupply'
		
				const sorted = await locals.pb.collection('GatheringStats').getList(1, 50, {
					sort,
					fields: 'id,name,currentSupply,flatParam,multiParam,priceCurve'
				})
		
				const { page, perPage, totalItems, totalPages, items } = structuredClone(sorted ?? {})
				//TODO: infinity scroll
				return {
					page, perPage, totalItems, totalPages,
					gatherings: items
				}
			} catch(loadGatheringsError) {
				console.error('error:/loadGatherings', loadGatheringsError) //TODO
				return {}
			}
		}
	}
}