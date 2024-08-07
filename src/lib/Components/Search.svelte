<script>
	import Button from './Button.svelte'
	import { SearchIcon } from '$Icons/'

	export let value = ''
</script>

<div class="flex items-center justify-center h-14 px-[9px] bg-search rounded-xl">
	<div class="mr-2">
		<SearchIcon />
	</div>

	<input
		type="text"
		class="flex-1 font-medium text-white text-mid placeholder-white placeholder-opacity-50 bg-transparent outline-none text-menu"
		placeholder="Search Something"
		bind:value
	/>

	<Button class="h-[39px] rounded-btn">Search</Button>
</div>
