<script>
	import '../app.pcss'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { init } from '$lib/logic'
	import { platform, theme } from '$Stores/telegram.js'
	import { hideGradient, hideBottomMenu } from '$Stores/state'
	import { setupViewTransition } from 'sveltekit-view-transition'

	import BottomMenu from '$Menu/BottomMenu.svelte'

	setupViewTransition()

	let isValid
	let userData
	let state = 'mounting'
	let mounted

	onMount(async () => {
		state = 'beforeValidation'

		const Telegram = (await import('@twa-dev/sdk')).default
		Telegram.ready()
		
		const { initDataUnsafe } = Telegram		
		isValid = (await init(initDataUnsafe)).valid

		console.log('T', Telegram)
		platform.set(Telegram.platform)
		theme.set(Telegram.colorScheme)

		state = 'afterValidation'
	})

	$: ({ route } = $page)
</script>

<main
	class="relative max-h-screen min-h-[100dvh] h-[100dvh] mx-auto overflow-hidden"
	class:dark={$theme === 'dark'}
>
	<div class="space"></div>

	{#key $page.url}
		<div class="px-4 pb-6 max-h-[calc(100vh)] overflow-auto overflow-x-hidden relative">
			<!-- <pre>{JSON.stringify(test, null, 2)}</pre> -->

			{#if state === 'mounting'}
				... mounting ...
			{/if}

			{#if state === 'beforeValidation'}
				... mounted<br>
				starting validation...
			{/if}

			{#if state == 'afterValidation'}
				{#if isValid }
					<slot />
					{#if route?.id !== '/become'}
						<div class="mt-20"></div>
					{/if}
				{:else}
					oops something went wrong<br>
					app only available inside telegram
				{/if}
			{/if}
		</div>
	{/key}


	{#if !$hideGradient}
		<div
			class="fixed max-w-[100vw] bottom-0 w-screen min-h-screen overflow-hidden pointer-events-none -z-10 max-w-screen"
		>
			<img
				src="/bg.png"
				alt=""
				class="absolute bottom-0 -z-10 -translate-x-1/2 left-1/2 w-full min-w-[400px]"
			/>
			<div
				class="h-[42vh] w-screen -z-20 rounded-full absolute -bottom-0 blur-3xl isolate left-1/2 -translate-x-1/2 bg-primary/40"
			></div>
		</div>
	{/if}

	<!-- {JSON.stringify($page, null, 2)} -->
	{#if route?.id !== '/become' && !$hideBottomMenu}
		<BottomMenu show={mounted} />
	{/if}
</main>

<style lang=postcss>
	:global(body) {
		background: #141414;
		color: #fff;
		color-scheme: dark;
	}
</style>