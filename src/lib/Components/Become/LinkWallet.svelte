<script>
	import { onDestroy, onMount } from 'svelte'
	import { hideIntroOverflow } from '$Stores/state'
	import Icon from './Icon.svelte'
	import Button from '../Button.svelte'
	import { ArrowRightIcon } from '$Icons/'
	import { goto } from '$app/navigation'

	export let link
	export let telegramUsername

	const handleNav = () => {
		window.TelegramWebviewProxy.postEvent('web_app_close', JSON.stringify({}))

		window.open(link, '_blank')
	}

    onMount(() => {
        $hideIntroOverflow = true
    })

    onDestroy(() => {
        $hideIntroOverflow = false
    })
</script>

<!-- <h2 class="font-semibold text-dark-text text-menu mb-sm">step 1</h2> -->

<h1 class="font-medium text-intro-title mb-sm mt-md">Link your wallet</h1>

<p class="text-base font-medium text-light-text mb-3">
	{telegramUsername}, in order to participate in telesages, you need to verify ownership of your etherum wallet.
</p>
<p class="text-base font-medium text-light-text">
	Currently we support <strong>metamask</strong> and <strong>brave browser</strong>, once you click on Link Wallet, select one of supported apps to open this link.
</p>

<Icon />

<div class="fixed flex w-full pr-8 bottom-5">
    <Button muted class="text-base bg-[#4E4E4E66] w-[111px]" on:click={() => goto('/')}>
        Close
    </Button>

    <Button class="flex-1 ml-2 text-base" {link}>
        <span class="block mr-2">
            Link Wallet
        </span>

        <ArrowRightIcon />
    </Button>
</div>