<script>
	import { CopyCodeIcon } from '$Icons/'
	import Button from './Button.svelte'

	export let code = ''
	export let showCopyButton = false

	let copied = false

	let lines = code.split('\n')
	let lineNumbers = lines.map((_, index) =>
		(index + 1).toString().padStart(2, '0')
	);
</script>

<div
	class="bg-[rgba(255,255,255,0.05)] w-full rounded-[10px] overflow-hidden text-btn"
>
	{#each lines as line, index}
		{@const isFirst = index === 0}
		{@const isLast = index === lines.length - 1}
		{@const isOneLiner = lines.length === 1}

		<div class="flex leading-[181%]">
			{#if !isOneLiner}
				<div
					class="mr-2 text-white/30 w-[30px] min-w-[30px] text-left px-[6px] bg-white/5 {isFirst
						? 'pt-[11px]'
						: ''} {isLast ? 'pb-[10px]' : ''}"
				>
					{lineNumbers[index]}
				</div>
			{/if}
			<div
				class="flex-1 break-words {isFirst ? 'pt-[11px]' : ''} {isLast
					? 'pb-[10px]'
					: ''}"
				class:text-center={isOneLiner}
				class:code={isOneLiner}
			>
				{line}
			</div>
		</div>
	{/each}
</div>

{#if showCopyButton}
	<div class="flex mt-2">
		<Button
			class="flex-1 bg-primary-disabled hover:bg-primary-disabled/60 transition-all"
			on:click={() => {
				try {
					navigator.clipboard.writeText(code);
					copied = true;

					setTimeout(() => {
						copied = false;
					}, 1000);
				} catch (error) {
					console.error(error);
				}
			}}
			outline
		>
			<CopyCodeIcon />
			<span class="ml-2"> {copied ? "Copied" : "Copy Code"}</span>
		</Button>
	</div>
{/if}

<style lang=postcss>
	.code {
		color: rgba(255, 255, 255, 0.69);
		font-size: 14px;
	}
</style>
