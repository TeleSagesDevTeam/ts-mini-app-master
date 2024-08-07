<script>
	import { page } from '$app/stores'
	import { navBack } from '$lib/logic.js'
	import { Menu, MenuItem } from '$Menu/'
	import { ArrowRightIcon, ListIcon, PlayIcon, VideoIcon } from '$Icons/'
	import Expandable from '../Expandable.svelte'
	import CopyCode from '../CopyCode.svelte'
	import Button from '../Button.svelte'

	let activeExpandable = 'text'

	const handleClick = id => {
		if(activeExpandable === id) return (activeExpandable = '')
		activeExpandable = id
	}

	$: ({ secretCode } = $page.data)
</script>

<h2 class="font-semibold text-dark-text text-menu mt-1 -mb-1">step 3</h2>

<h1 class="font-medium text-intro-title mb-md">Create New Gathering</h1>

<p class="text-base font-medium text-light-text mb-6">
	Lorem ipsum dolor sit amet, consectetur adipiscing elit
</p>

<Expandable
	title="Text instruction"
	subtitle="click to toggle"
	expanded={activeExpandable === 'text'}
	onClick={() => handleClick('text')}
>
	<ListIcon slot=icon />
	<h2 class="flex font-medium">
		<span class="inline-block mr-2 font-semibold text-primary">01</span>

		<span>
			Open menu in Telegram App and click "New Group",
			then provide name and click OK.
		</span>
	</h2>

	<!-- <img src="/intro/create-group.svg" alt="" class="w-full mt-4 mb-2" /> -->

	<h2 class="mt-3 font-medium">
		<span class="inline-block mr-2 font-semibold text-primary">02</span>
	
		Add <a class="text-primary underline font-semibold" href="https://t.me/telesages_seed_bot">this</a> bot to your newly created group
	</h2>

	<h2 class="mt-3 font-medium">
		<span class="inline-block mr-2 font-semibold text-primary">03</span>
	
		Make it admin and be able to read messages
	</h2>

	<h2 class="mt-3 font-medium">
		<span class="inline-block mr-2 font-semibold text-primary">04</span>
	
		Paste and run this command in your group:
		<span class="block pt-1"></span>
		<CopyCode toCopy={`/verifyGathering ${secretCode}`} />
	</h2>

	<h2 class="flex mt-3 mb-4 font-medium">
		<span class="inline-block mr-2 font-semibold text-primary">05</span>

		<span>Use link provided by the bot to continue, or come back here at later time.</span>
	</h2>

	<h2 class="flex mt-3 text-white/70 italic ml-2">
		if you have any problem or questions ask on our&nbsp;<a class="text-primary underline" href="https://t.me/telesage">telegram group</a>
	</h2>
</Expandable>

<Expandable
	title="Video instruction"
	subtitle="click to toggle"
	onClick={() => handleClick('video')}
	expanded={activeExpandable === 'video'}
	showBorder
>
	<VideoIcon slot=icon />
	<div
		class="h-[193px] flex items-center justify-center rounded-btn bg-white/5 w-full mb-7"
	>
		<PlayIcon /> <span class="ml-2 font-semibold text-btn">coming soon</span>
	</div>

	<!-- <CopyCode
		code={`async def message(bot, chat_id):  # mostly used in \ntests for edit_message
    out = await bot.send_message(
        chat_id, "Text", disable_web_page_preview=True, disable_notification=True`}
		showCopyButton
	/> -->

	<div class="p-9"></div>
</Expandable>

<div class="mb-16"></div>

<Button
	muted class="text-base bg-[#4E4E4E66] w-full"
	on:click={navBack}
>
	Back
</Button>