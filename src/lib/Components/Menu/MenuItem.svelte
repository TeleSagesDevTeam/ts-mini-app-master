<script>
	export let send
	export let receive

	export let active = false
</script>

<button
	class="flex relative items-center transition-all justify-center flex-1 font-medium h-full text-menu rounded-menu"
	class:text-dark-text={!active}
	on:click
>
	<span
		class="mr-2 [&>*]:transition-all z-20 {active ? 'text-primary' : 'text-dark-text'}"
	>
		<slot name=icon />
	</span>

	<span class="z-20">
		<slot />
	</span>

	{#if active}
		<div
			class="absolute left-0 z-10 w-full h-full bg-menu-item-active rounded-menu"
			in:receive={{ key: 'active' }}
			out:send={{ key: 'active' }}
		/>
	{/if}
</button>
