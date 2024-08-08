
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

			<p class="text-xs font-medium leading-5 text-light-text flex items-center gap-2">
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<mask
						id="mask0_403_611"
						style="mask-type:alpha"
						maskUnits="userSpaceOnUse"
						x="0"
						y="0"
						width="24"
						height="24"
					>
						<rect
							width="24"
							height="24"
							fill="#D9D9D9"
						/>
					</mask>
					<g mask="url(#mask0_403_611)">
						<path
							d="M6 20C4.9 20 3.95833 19.6083 3.175 18.825C2.39167 18.0417 2 17.1 2 16V8C2 6.9 2.39167 5.95833 3.175 5.175C3.95833 4.39167 4.9 4 6 4H18C19.1 4 20.0417 4.39167 20.825 5.175C21.6083 5.95833 22 6.9 22 8V16C22 17.1 21.6083 18.0417 20.825 18.825C20.0417 19.6083 19.1 20 18 20H6ZM6 8H18C18.3667 8 18.7167 8.04167 19.05 8.125C19.3833 8.20833 19.7 8.34167 20 8.525V8C20 7.45 19.8042 6.97917 19.4125 6.5875C19.0208 6.19583 18.55 6 18 6H6C5.45 6 4.97917 6.19583 4.5875 6.5875C4.19583 6.97917 4 7.45 4 8V8.525C4.3 8.34167 4.61667 8.20833 4.95 8.125C5.28333 8.04167 5.63333 8 6 8ZM4.15 11.25L15.275 13.95C15.425 13.9833 15.575 13.9833 15.725 13.95C15.875 13.9167 16.0167 13.85 16.15 13.75L19.625 10.85C19.4417 10.6 19.2083 10.3958 18.925 10.2375C18.6417 10.0792 18.3333 10 18 10H6C5.56667 10 5.1875 10.1125 4.8625 10.3375C4.5375 10.5625 4.3 10.8667 4.15 11.25Z"
							fill="white"
						/>
					</g>
				</svg>
				{walletAddress ? truncateAddr(walletAddress, 11) : 'No Connected'}
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
			<span class="text-light-text text-btn">Your Profit</span>
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