import { writable } from 'svelte/store'

export const isSage = writable()
export const isWalletLinked = writable()
export const telegramUsername = writable()

export const platform = writable('')
export const theme = writable('system')