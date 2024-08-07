<script>
	export let icon
	export let title = ''
	export let value = ''
</script>

<div class="flex items-center justify-center">
	<div class="flex items-center justify-start flex-1">
		<div class="h-11 flex items-center justify-center mr-[10px] w-11 rounded-btn text-primary-light bg-[#F0F0F0] dark:bg-btn-muted dark:text-primary">
			<svelte:component this={icon} />
		</div>

		<span class="font-medium text-menu text-[#9AA3AB] dark:text-light-text">
			{title}
		</span>
	</div>

	<span class="font-semibold">
		{@html value}
	</span>
</div>