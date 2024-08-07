import { decrypt } from '$lib/server/auth'
import { pb } from '$lib/server/db'

/** @type {import('@sveltejs/kit').Handle} */
/** @type {import('@sveltejs/kit').RequestEvent} */
export const handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session')

	if(session) {
		try {
			const userData = await decrypt(session)

			event.locals.user = JSON.parse(userData)
			event.locals.pb = pb
		} catch(decryptionError) {
			console.error({ decryptionError })
		}
	} else {
		event.locals = { pb }
	}

	return await resolve(event)
}