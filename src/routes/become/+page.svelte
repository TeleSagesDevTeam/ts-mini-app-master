<script>
	import { onDestroy, onMount,  } from 'svelte'
	import { dev } from '$app/environment'
	import { beforeNavigate } from '$app/navigation'
	import { platform } from '$Stores/telegram.js'
	import { hideGradient } from '$Stores/state'
	import { getMetamaskLink } from '$lib/logic.js'
	import { StepperHeading } from '$Stepper/'
	import LinkWallet from '$Become/LinkWallet.svelte'
	import VerifyGroupOwner from '$Become/VerifyGroupOwner.svelte'
	import CreateGathering from '$Become/CreateGathering.svelte'
	import SetupGathering from '$Become/SetupGathering.svelte'

	export let data

	const stepMap = {
		'linkWallet': 1,
		'linkOG': 2,
		'createGathering': 3,
		'setupGathering': 4
	}
// let deve


// 	const openMetaMaskUrl = url => {
// 		console.log(url)
// 		const a = document.createElement('a')
// 		a.href = url
// 		a.target = '_self'
// 		document.body.appendChild(a)
// 		a.click()
// 		a.remove()
// 	}

	onMount(() => {
		$hideGradient = true
	})
	
	onDestroy(() => {
		$hideGradient = false
	})

	console.log(data);
	$: ({ telegramUsername, ogGroupName, step, x, toProve } = data)
</script>

<div class="pt-4">
	<StepperHeading activeStep={stepMap[step]} showActiveStep={true} />
</div>

<div class="space"></div>
{#if !telegramUsername}
	You don't have telegram username setup, it is required to become a sage.<br>
	Configure your telegram username and comeback once you're done.
{:else}
	{#if step === 'linkWallet'}
		<LinkWallet {telegramUsername} link={getMetamaskLink($platform, 'linkWallet', x)} />
	<!-- <button class="font-semibold transition-all bg-primary hover:bg-primary-hover active:bg-primary-active flex items-center justify-center rounded-btn p-3">
		<a class="" href={getMetamaskLink($platform)} target="_blank">LINK WALLET</a>
	</button> -->
		<!-- before click close() -->
		<!-- moze patent co uzywa tej funkcji co otwiera link i zamyka, a w tym linku auto open new tab -->
	{/if}

	{#if step === 'linkOG'}
		<VerifyGroupOwner {toProve} />
	{/if}

	{#if step === 'createGathering'}
		<CreateGathering />
	{/if}

	{#if step === 'setupGathering'}
		<SetupGathering link={getMetamaskLink($platform, 'createPool', x)} />
	{/if}
{/if}