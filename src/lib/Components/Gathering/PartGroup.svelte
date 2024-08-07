<script>
	import Button from '$lib/Components/Button.svelte'
	import { RightIcon } from '$Icons/'
	import { currentModal } from '$Stores/state.js'

	export let img
	export let name
	export let description
	export let currentPrice
</script>

<div class="flex items-center gap-3">
	<div class="flex items-center flex-1">
		<div class="mr-[18px]">
			<img
				src={img}
				alt={name}
				class="w-[50px] h-[50px] min-w-[50px] min-h-[50px] rounded-full"
			/>
		</div>

		<div class="flex-1">
			<h3 class="font-medium truncate text-menu-item max-w-[169px]">{name}</h3>
			<p class="mt-[1px] truncate max-w-[calc(100vw-250px)] font-semibold leading-4 text-dark-text text-small">
				{description}
			</p>
		</div>
	</div>

	<div class="flex items-center pt-2">
		<p class="text-right min-w-[max-content] font-semibold leading-3 text-menu">
			<span class="text-primary">{currentPrice}</span><br>
			<span class="text-[10px] font-bold text-primary/60">ETH</span>
		</p>
	</div>

	<div class="flex items-center pt-2">
		<Button class="w-10 h-10 [&>*]:w-6 [&>*]:h-6 p-0" isIcon on:click>
			<RightIcon />
		</Button>
	</div>
</div>
