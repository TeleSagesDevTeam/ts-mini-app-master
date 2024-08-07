<script>
	import { createAnimationStore } from '$Stores/animation'
	import { navBack } from '$lib/logic.js'
	import { Menu, MenuItem } from '$Menu/'
	import { ListIcon, PlayIcon, TelegramIcon, TwitterIcon, VideoIcon } from '$Icons/'
	import Expandable from '../Expandable.svelte'
	import CodeBlock from '../CodeBlock.svelte'
	import CopyCode from '../CopyCode.svelte'
	import Button from '../Button.svelte'

	export let toProve

	let active = what || 'telegram'
	let activeExpandable = 'text'

	const animationStore = createAnimationStore()
	let { send, receive } = $animationStore

	const handleClick = id => {
		if(activeExpandable === id) return (activeExpandable = '')
		activeExpandable = id
	}

	$: ({ what, proof} = toProve ?? {})
</script>

<h2 class="font-semibold text-dark-text text-menu mt-1 -mb-1">step 2</h2>

<h1 class="font-medium text-intro-title mb-md">Verify group owner</h1>

<p class="text-base font-medium text-light-text mb-6">
	In order to proof you are who you say you are, you need to verify your OG account.
</p>

<Menu class="my-7">
	<MenuItem
		active={active === "telegram"}
		on:click={() => (active = "telegram")}
		{send}
		{receive}
	>
		<TelegramIcon slot=icon />
		Telgram
	</MenuItem>

	<MenuItem
		active={active === "twitter"}
		on:click={() => (active = "twitter")}
		{send}
		{receive}
	>
		<TwitterIcon slot=icon />
		Twitter
	</MenuItem>
</Menu>

<div class="space"></div>

{#if active === 'telegram'}
	<Expandable
		title="Text instruction"
		subtitle="click for see"
		expanded={activeExpandable === "text"}
		onClick={() => handleClick("text")}
	>
		<ListIcon slot=icon />
		<h2 class="mt-10 font-medium">
			<span class="inline-block mr-2 font-semibold text-primary">01</span>
		
			Add this bot to group you would like to verify as yours
		</h2>
		
		<h2 class="mt-3 font-medium">
			<span class="inline-block mr-2 font-semibold text-primary">02</span>
		
			Make it admin and be able to read messages
		</h2>
		
		<h2 class="mt-3 font-medium">
			<span class="inline-block mr-2 font-semibold text-primary">03</span>
		
			Paste this command into group:
			<span class="block pt-1"></span>
			<CopyCode toCopy={`/verifyOG ${proof}`} />
		</h2>
		
		<h2 class="mt-3 font-medium">
			<span class="inline-block mr-2 font-semibold text-primary">04</span>
		
			Use link provided by the bot to continue, or come back here at later time.
		</h2>
	</Expandable>

	<Expandable
		title="Video instruction"
		subtitle="coming soon"
		onClick={() => 'handleClick("video")'}
		expanded={activeExpandable === "video"}
		showBorder
	>
		<VideoIcon slot=icon />
		<div
			class="h-[193px] flex items-center justify-center rounded-btn bg-white/5 w-full mb-7"
		>
			<PlayIcon /> <span class="ml-2 font-semibold text-btn">play video</span>
		</div>

		<CodeBlock
			code={`async def message(bot, chat_id):  # mostly used in \ntests for edit_message
		out = await bot.send_message(
			chat_id, "Text", disable_web_page_preview=True, disable_notification=True`}
			showCopyButton
		/>

		<div class="p-2"></div>
	</Expandable>
{/if}

{#if active === 'twitter'}
coming soon...
{/if}

<div class="mb-16"></div>

<Button
	muted class="text-base bg-[#4E4E4E66] w-full"
	on:click={navBack}
>
	Back
</Button>