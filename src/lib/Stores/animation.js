import { cubicInOut } from 'svelte/easing'
import { writable } from 'svelte/store'
import { crossfade } from 'svelte/transition'

export const createAnimationStore = () => {
	const [send, receive] = crossfade({
		easing: cubicInOut,
		duration: 300,
	})

	const store = writable({
		send,
		receive,
	})

	return store
}