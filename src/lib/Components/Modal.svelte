<script>
	import { fade, fly } from 'svelte/transition'

	export let open = false
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="fixed flex items-end justify-center inset-0 z-[100] w-full h-full overflow-hidden bg-overlay transition-all {open
		? ''
		: `
            pointer-events-none
            opacity-0
        `}"
	tabindex="-1"
	on:click={(e) => {
		if (e.target === e.currentTarget) open = false;
	}}
>
	{#if open}
		<div
			class="flex-1 p-5 bg-modal-content"
			in:fly={{ y: 20, duration: 200, delay: 100 }}
			out:fly={{ y: 10, duration: 400 }}
		>
			<slot />
		</div>
	{/if}
</div>

<style>
	.bg-modal-content {
		max-height: 95vh
	}
</style>