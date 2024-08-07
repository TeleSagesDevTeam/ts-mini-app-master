<script>
	import { CopyCodeIcon } from '$Icons/'

	export let toCopy = ''

	let copied = false

	const copy = () => {
		try {
			navigator.clipboard.writeText(toCopy)
			copied = true

			setTimeout(() => {
				copied = false
			}, 1000)
		} catch(error) {
			console.error(error)
		}
	}
</script>

<div class="bg-[#2b2d2f] w-full rounded-btn overflow-hidden text-btn">
	<button
		class="flex leading-[181%] relative items-center w-full"
		on:click={copy}
	>
		<div
			class="flex-1 break-words text-white/70 p-3"
			class:text-center={copied}
			class:text-left={!copied}
		>

			<span class:text-center={copied}>
				{copied ? 'copied' : toCopy}
			</span>
		</div>

		<div class="absolute right-1">
			<CopyCodeIcon />
		</div>
	</button>
</div>