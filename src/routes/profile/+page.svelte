
<script>
	import { page } from '$app/stores'
	import { preloadData } from '$app/navigation'
	import { theme } from '$Stores/telegram.js'
	import { createAnimationStore } from '$Stores/animation.js'
	import { truncateAddr } from '$lib/logic.js'

	import { Menu, MenuItem } from '$Menu/'
	import { ProfileGroup } from '$Gathering/'
	import { Button, SparkLineChart } from '$Components/'
	import { HeartIcon, MembersIcon } from '$Icons/'
	import Modal from '$lib/Components/Modal.svelte'
	import GatheringDetails from '../gatherings/[id]/+page.svelte'

	export let data

	let active = 'joined'
	let openModal
	let preload

	const animationStore = createAnimationStore()
	const { send, receive } = $animationStore

	const showGathering = async id => {
		preload = await preloadData(`/gatherings/${id}`)
		if(preload.type === 'loaded' && preload.status === 200) {
			openModal = true
		}
	}

	$: ({ avatar, joined, gatherings, telegramUsername, walletAddress } = data)
	
	$: profit = {
		total: 69,
		chart: [0, 50, 25, 45, 40, 55, 50, 50, 100]
	}
</script>

<div class="flex">
	<div class="flex flex-1 gap-3">
		<img
			src="{avatar ? avatar : '/default_avatar.webp'}"
			alt=""
			class="w-[75px] h-[75px] rounded-full"
		/>

		<div class="flex flex-col items-start justify-center">
			<h1 class="text-2xl font-medium">{telegramUsername}</h1>

			<p class="text-xs font-medium leading-5 text-light-text">
				{walletAddress ? truncateAddr(walletAddress, 11) : ''}
			</p>
		</div>
	</div>
</div>

<div class="my-3"></div>

<div class="grid grid-cols-2 gap-4">
	<div class="flex items-center justify-center col-span-1">
		{#key $theme}
			<SparkLineChart data={profit?.chart ?? [0,0]} />
		{/key}
	</div>

	<div class="flex flex-col items-center justify-center col-span-1">
		<div>
			<!-- <span class="text-[10px] font-semibold dark:text-green text-[#23CFAD]">0 ETH</span> -->
			<span class="text-light-text text-btn">your Profit</span>
			<h3 class="text-lg font-semibold {profit?.total > 0 ? 'dark:text-green text-[#23CFAD]' : 'dark:text-red'}">{profit?.total > 0 ? '+' : ''}{profit?.total ?? 0} <span>ETH</span></h3>
		</div>
	</div>
</div>

<div class="my-3"></div>

<Menu>
	<MenuItem
		active={active === 'joined'}
		{receive} {send}
		on:click={() => active = 'joined'}
	>
		<HeartIcon slot=icon />
		Joined
	</MenuItem>

	<MenuItem
		active={active === 'myGatherings'}
		{receive} {send}
		on:click={() => active = 'myGatherings'}
	>
		<MembersIcon slot=icon />
		My Gatherings
	</MenuItem>
</Menu>

<div class="my-5"></div>

{#if active === 'joined'}
	{#if joined?.length}
		<div class="space-y-5">
			{#each joined ?? [] as {id, thumbnail, name, description}, index}
				<ProfileGroup
					img={thumbnail ? thumbnail : `/default_gathering_${index+1}.webp`}
					{description} {name} {id}
					mainAction={() => showGathering(id)}
				/>
			{/each}
		</div>
	{:else}
		<p class="font-medium">You have not joined any gatherings yet.</p>
		<p class="font-medium">Go to <a class="text-primary underline" href="/">Home</a> and purchase your first key.</p>
	{/if}

	<Modal bind:open={openModal}>
		<GatheringDetails data={preload.data} />
	</Modal>
{/if}

{#if active === 'myGatherings'}
	{#if gatherings?.length}
		<div class="space-y-6 asd">
			{#each gatherings ?? [1,2,3, 4] as sage}
				<ProfileGroup
					img="/default_gathering_{sage}.webp"
					description="545 Members"
					name="Apache server"
					id=""
				/>
			{/each}
		</div>
	{:else}
		<p class="font-medium">You have not created any gatherings yet.</p>
		<p class="font-medium">Go to <a class="text-primary underline" href="/become">become</a> to create your first one.</p>
	{/if}

	<Modal bind:open={openModal}>
		<GatheringDetails data={preload.data} />
	</Modal>
{/if}



<style>
	:global(.asd img) {
		filter: invert(100%)
	}
</style>