<script>
	import Button from '$lib/Components/Button.svelte'
	import { BookmarkIcon, RightIcon } from '$Icons/'

	export let img
	export let name
	export let description
	export let extraAction = () => {}
	export let mainAction = () => {}

	let cw
</script>

<div class="flex items-center gap-2 w-full" bind:clientWidth={cw}>
	<div class="flex items-center flex-1 gap-2">
		<img
			src={img}
			alt={name}
			class="w-[50px] h-[50px] min-w-[50px] min-h-[50px] rounded-full"
		/>

		<div class="flex-1" style:max-width={`calc(${cw}px - 1rem - 90px)`}>
			<h3 class="font-semibold truncate text-menu-item">{name}</h3>
			<!-- <p class="line-clamp-2 leading-4 text-white/70 text-small">
				{description}
			</p> -->
		</div>
	</div>

	<div class="flex items-center pt-2">
		<Button
			muted
			class="h-10 mr-2 text-mid text-primary hover:bg-kurwa/70 active:scale-[0.95] backdrop-blur-lg"
			on:click={extraAction}
		>
			<span class="[&>*]:fill-primary mr-2">
				<BookmarkIcon />
			</span>
			Sell
		</Button>

		<Button
			class="w-10 h-10 [&>*]:w-6 [&>*]:h-6 p-0"
			isIcon
			on:click={mainAction}
		>
			<RightIcon />
		</Button>
	</div>
</div>
