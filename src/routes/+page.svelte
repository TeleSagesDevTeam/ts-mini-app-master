<script>
	import { parse } from 'devalue'
	import { onMount } from 'svelte'
	
	import { preloadData, pushState, goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { createAnimationStore } from '$Stores/animation.js'
	import { hideGradient } from '$Stores/state'
	import { currentPrice } from '$lib/logic.js'
	
	import { Menu, MenuItem } from '$Menu/'
	import { PartGroup } from '$Gathering/'
	import Search from '$lib/Components/Search.svelte'
    import Modal from '$lib/Components/Modal.svelte'
	import Button from '$lib/Components/Button.svelte'
	import { CupIcon, FireIcon, NewIcon } from '$Icons/'

	import GatheringDetails from './gatherings/[id]/+page.svelte'

	export let data

	let activeMenu = 'trending'
	let searchValue = ''
	let openModal
	let preload

	let filteredItems

	$: if(searchValue) {
		filteredItems = gatherings.filter(item =>
			item.name.toLowerCase().includes(searchValue.toLowerCase())
		)
	} else {
		filteredItems = gatherings ?? []
	}

	const animationStore = createAnimationStore()
	let { send, receive } = $animationStore

	const getSort = async sort => {
		activeMenu = sort
		const req = await fetch('/?default', {
			method: 'POST',
			body: activeMenu
		})
		const res = await req.json()
		if(res && res.status === 200) {
			const parsed = parse(res.data)
			gatherings = parsed.gatherings

			console.log(gatherings, parsed)
		}
	}

	const showGathering = async id => {
		preload = await preloadData(`/gatherings/${id}`)
		if(preload.type === 'loaded' && preload.status === 200) {
			openModal = true
		}
	}
	
	onMount(() => {
		$hideGradient = false
	})

	$: ({ perPage, totalItems, gatherings } = data)
	$: console.log({activeMenu, gatherings, openModal, $page})
	
</script>

<Search bind:value={searchValue} />

<div class="space"></div>

<Menu>
	<MenuItem
		active={activeMenu === 'trending'}
		on:click={() => getSort('trending')}
		{send}
		{receive}
	>
		<FireIcon slot=icon />
		Trending
	</MenuItem>

	<MenuItem
		active={activeMenu === 'top'}
		on:click={() => getSort('top')}
		{send}
		{receive}
	>
		<CupIcon slot=icon />
		Top
	</MenuItem>
	
	<MenuItem
		active={activeMenu === 'new'}
		on:click={() => getSort('new')}
		{send}
		{receive}
	>
		<NewIcon slot=icon />
		New
	</MenuItem>
</Menu>


<p class="my-[26px] font-medium leading-3 text-light-text text-menu">{totalItems} Groups Available</p>

<div class="space-y-6">
	{#each filteredItems.sort((a, b) => ([...activeMenu].reduce((acc, cur) => acc + cur.charCodeAt(0), 0) % 2 ? a.cat - b.cat : b.cat - a.cat)) as item}
		{@const curveType = item.priceCurve}
		{@const multiParam = item.multiParam}
		{@const flatParam = item.flatParam}
		{@const currSupply = item.currentSupply}

		<PartGroup
			img={`/default_gathering_${Math.floor(Math.random() * 3) + 1}.webp`}
			name={item.name}
			description="{currSupply} {currSupply > 1 || currSupply === 0 ? 'members' : 'member'}"
			currentPrice={currentPrice(curveType, multiParam, flatParam, currSupply)}
			link={item.id}
			on:click={() => showGathering(item.id)}
		/>
	{/each}
</div>

<Modal bind:open={openModal}>
	<GatheringDetails data={preload.data} on:close={() => openModal = false} />
</Modal>