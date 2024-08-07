<script>
	import { fly, scale, slide } from 'svelte/transition'
	import { ClosedArrowIcon, OpenedArrowIcon } from '$Icons/'

	export let onClick = () => null
	export let expanded = false
	export let title
	export let subtitle
	export let showBorder = false

	let className = ''

	export { className as class }
</script>

<div class="box mb-[12px] {className}" class:expanded>
	<button
		class="h-[50px] flex items-center w-full justify-start"
		on:click={onClick}
	>
		<div class="icon flex items-center bg-[#202224] justify-center rounded-full h-[50px] w-[50px]">
			<slot name=icon />
		</div>

		<div class="flex ml-[13px] flex-col flex-1 text-left">
			<div class="text-base font-medium leading-[120%]">{title}</div>
			<div class="font-medium text-btn text-dark-text">{subtitle}</div>
		</div>

		<div class="relative flex items-center justify-center">
			{#if expanded}
				<div in:scale out:scale class="absolute right-0">
					<OpenedArrowIcon />
				</div>
			{:else}
				<div in:scale out:scale class="absolute right-0">
					<ClosedArrowIcon />
				</div>
			{/if}
		</div>
	</button>

	{#if expanded}
		<div class="mt-7" in:slide out:slide>
			<slot />
		</div>
	{/if}
</div>

{#if showBorder}
	<div
		class="w-[calc(100%-50px)] h-[1px] rounded-full bg-[#202224] ml-[50px] mt-3 mb-3"
	></div>
{/if}

<style lang=postcss>
	.box {
		@apply p-3
	}
	.expanded {
		@apply bg-menu-item-active rounded-btn;
	}
	:global(.expanded .icon svg circle) {
		fill: #4E4E4ECC;
	}
</style>