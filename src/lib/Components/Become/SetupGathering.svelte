<script>
	import { navBack } from '$lib/logic.js'
	import { ArrowRightIcon } from '$Icons/'
	import Button from '../Button.svelte'

	export let link

	const handleNav = () => {
		window.open(link, '_blank')
		window.TelegramWebviewProxy?.postEvent('web_app_close', JSON.stringify({}))
	}
</script>

<h2 class="font-semibold text-dark-text text-menu mt-1 -mb-1">step 4</h2>

<h1 class="font-medium text-intro-title mb-md">Setup your Gathering</h1>

<p class="text-base font-medium text-light-text mb-6">
	Last step is to setup your gathering pricing, click "Next Step" in order to proceed.
</p>

<div class="fixed flex w-full pr-8 bottom-5 gap-3">
    <Button
		muted class="text-base bg-[#4E4E4E66] basis-1/3"
		on:click={navBack}
	>
        Back
    </Button>

	<Button class="w-full text-base" on:click={handleNav}>
		<span class="mr-2 text-base"> Next Step </span>
		<ArrowRightIcon />
	</Button>
</div>