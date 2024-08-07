<script>
	let classes = ''

	export let isIcon = false
	export let muted = false
	export let link
	export let disabled
	export let other

	export { classes as class }
</script>

{#if link}
	<a href={link} target=_blank
		{disabled} inert={disabled}
		class:opacity-[0.2]={disabled}
		class="font-semibold transition-all active:scale-[0.95] {muted
			? 'bg-btn-muted hover:bg-btn-muted-hover'
			: (other ? '' : 'bg-primary hover:bg-primary-hover')} flex items-center justify-center rounded-btn {isIcon
			? ''
			: 'text-btn p-btn'} {classes}"
	>
		<slot />
	</a>
{:else}
	<button
		{disabled} inert={disabled}
		class:brightness-70={disabled}
		class="font-semibold transition-all active:scale-[0.95] {muted
			? 'bg-btn-muted hover:bg-btn-muted-hover'
			: (other ? '' : 'bg-primary hover:bg-primary-hover')} flex items-center justify-center rounded-btn {isIcon
			? ''
			: 'text-btn p-btn'} {classes}"
		on:click
	>
		<slot />
	</button>
{/if}
