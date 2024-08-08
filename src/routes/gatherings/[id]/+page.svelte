<script>
	import { fly } from 'svelte/transition'
	import { createEventDispatcher } from 'svelte'
	import { platform, theme } from '$Stores/telegram.js'
	import { createAnimationStore } from '$Stores/animation.js'
	import { formatTime, getMetamaskLink } from '$lib/logic.js'

	import { Menu, MenuItem } from '$Menu/'
	import { TradeGroup } from '$Gathering/'
	import { StoreFrontIcon, HelpIcon, EditIcon, CartIcon, LockIcon, AccountIcon, KeyIcon } from '$Icons/'
	import Button from '$lib/Components/Button.svelte'
	import { goto } from '$app/navigation'

	export let data

	const dispatch = createEventDispatcher()
	const animationStore = createAnimationStore()
	let { send, receive } = $animationStore

	let activeTab = 'trade'

	$: ({ ogGroupName, name, description, currentSupply, totalBuys, totalSells, price, supplyChange1H, volumeETH1H, timeSinceLastTrade, x, isMemberOf, isWalletLinked } = data)
	
</script>

<Menu class="mb-[30px]">
	<MenuItem
		active={activeTab === 'trade'}
		on:click={() => activeTab = 'trade'}
		{send} {receive}
	>
		<StoreFrontIcon slot=icon />
		Trade{price}
	</MenuItem>
	<MenuItem
		active={activeTab === 'details'}
		on:click={() => activeTab = 'details'}
		{send} {receive}
	>
		<HelpIcon slot=icon />
		Details
	</MenuItem>
	<MenuItem
		active={activeTab === 'edit'}
		on:click={() => activeTab = 'edit'}
		{send} {receive}
	>
		<EditIcon slot=icon />
		Edit
	</MenuItem>
</Menu>

<div class="space"></div>

{#if activeTab === 'trade'}
	<div in:fly={{ y: -10, duration: 369 }}>
		
		<div class="mb-16 space-y-3 px-1 relative z-10">
			<TradeGroup icon={CartIcon} title="Buys / Sells" value={`<span style="color:#00c853">${totalBuys}</span> / <span style="color:#c80000">${totalSells}</span>`} />
			<TradeGroup icon={KeyIcon} title="Supply" value={currentSupply} />

			<TradeGroup icon={LockIcon} title="volumeETH1H" value={volumeETH1H} />
			<TradeGroup icon={LockIcon} title="supplyChange1H" value={supplyChange1H} />
			<TradeGroup icon={AccountIcon} title="timeSinceLastTrade" value={formatTime(timeSinceLastTrade)} />

			<p class="text-light-text">maybe should add some chart here?</p>
		</div>

		<!-- {#if $theme === "dark"} -->
			<!-- <div class="dark:bg-[#202224] fixed left-0 bottom-0 w-full h-[200px]"></div> -->
	
		<!-- {/if} -->

		
	</div>
	<div class="relative z-10 flex flex-col items-center justify-center w-full text-center">
			<h1 class="text-[32px] font-medium leading-none">
				{price} <span class="text-[17px]">ETH</span>
			</h1>

			<p class="font-medium dark:text-white text-[#141414] text-btn opacity-40">
				current price
			</p>


			
			<div class="w-full flex gap-3 mt-8">
				<Button
					muted class="flex-1/3 text-base bg-[#4E4E4E]/40"
					on:click={() => dispatch('close')}
				>
					<!-- {@html LocalMall} -->
					<span class="block font-medium">Back</span>
				</Button>

				{#if isMemberOf}
					<Button other class="flex-1 text-base bg-[#FF264D] hover:bg-[#FF264D]/80" link={getMetamaskLink($platform, 'sell', x)}>
						<!-- {@html LocalMall} -->
						<span class="block font-bold">Sell</span>
					</Button>
				{/if}

				{#if isWalletLinked}
					<Button class="flex-1 text-base bg-[#00C853]/80 hover:bg-[#00C853]" link={getMetamaskLink(platform, 'buy', x)}>
						<span class="block font-bold">Buy</span>
					</Button>
				{:else}
					<Button other class="flex-1 text-base bg-[#00C853]/80 hover:bg-[#00C853]" on:click={() => goto('/become')}>
						<!-- {@html LocalMall} -->
						<span class="block font-bold">Buy</span>
					</Button>
				{/if}
			</div>
		</div>

		<div class="dark:bg-[#202224] fixed left-0 bottom-0 w-full h-[200px]"></div>
		<img
			src="/bg.png"
			alt=""
			class="absolute bottom-0 -translate-x-1/2 left-1/2 w-full h-[200px]"
		/>
{:else if activeTab === 'details'}
	<div in:fly={{ y: -10, duration: 369 }}>
		<!-- style:overflow=auto style="height: calc(95vh - 2.5rem - 156px)" -->
		<div class="flex flex-col items-center justify-center relative z-10">
			<!-- <img src="/default_gathering_{Math.floor(Math.random()*3)+1}.webp" alt="" class="w-[60px] rounded-full" /> -->
			<h1 class="font-medium text-lg">{name}</h1>
			<!-- <div class="flex gap-3">
				
				<div>
					<div class="flex items-center justify-start mt-1 text-xs font-medium text-primary-light dark:text-primary">
						<span class="mr-[5px]">
						t.me/TelegramName
					</div>
				</div>
			</div> -->
			<div class="w-full border-b mt-2 mb-3 border-b-white/10"></div>
			<p class="dark:text-white text-[#141414] text-btn opacity-70 font-medium text-justify pb-10 max-h-56 overflow-auto">{description}{description}{description}{description}{description}{description}</p>


		</div>
	</div>


	<div class="relative z-10">
		<div class="relative flex flex-col items-center justify-center w-full ext-center">
		<p class="font-medium dark:text-white text-[#141414] text-btn opacity-40 mt-1">OG of this gathering:</p>
			<h1 class="text-3xl font-medium">{ogGroupName}</h1>
			<div>
				<div class="flex items-center justify-start mb-1 text-xs font-medium text-primary-light dark:text-primary">
					<span class="mr-[5px]">t.me/SOON™</div>
			</div>

		</div>

		<div class="w-full flex gap-3 mt-3">
			<Button
				muted class="flex-1/3 text-base bg-[#4E4E4E]/40"
				on:click={() => dispatch('close')}
			>
				<!-- {@html LocalMall} -->
				<span class="block font-medium">Back</span>
			</Button>
			<Button class="flex-1 w-full text-base" secondary>
				<span class="block ml-2 font-medium">Visit OG (SOON™)</span>
			</Button>
		</div>
	</div>


	<img
		src="/bg.png"
		alt=""
		class="dark:bg-[#202224] absolute -bottom-[6px] -translate-x-1/2 left-1/2 w-full h-[169px] z-0"
	/> 
	<!-- 
		<div class="relative flex flex-col items-center justify-center w-full ext-center">
			<h1 class="text-[32px] font-medium">45 645</h1>

			<p class="font-medium dark:text-white text-[#141414] text-btn opacity-40">members</p>
		</div>
	</div>
	<img
		src="/bg.png"
		alt=""
		class="absolute bottom-0 -translate-x-1/2 left-1/2 w-full h-[200px]"
	/> -->
{:else}
	<div in:fly={{ y: -10, duration: 369 }}>
		<h1 class="text-3xl p-6 text-center font-bold h-[300px]">SOON™</h1>
	</div>
{/if}