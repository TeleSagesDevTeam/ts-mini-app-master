<script>
	import { AddIcon, HomeIcon, UnionIcon } from '$Icons/'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { reveal } from 'svelte-reveal'
</script>

<div
	class="absolute left-0 right-0 backdrop-blur-md py-2 z-50 bg-[#1a1a1a83] bottom-2 rounded-2xl w-[95%] mx-auto flex items-center justify-around"
	use:reveal={{ transition: 'fly', y: 19, duration: 369 }}
>
	<a
		class="flex flex-col [&>*]:transition-all transition-all items-center justify-center text-white
		{$page.route.id === '/' ? '[&>*]:fill-white' : '[&>*]:fill-light-text'}"
		href="/"
	>
		<HomeIcon />

		<span class="mt-1 text-[10px] font-semibold {$page.route.id === '/' ? '' : 'text-light-text'}">
			Home
		</span>
	</a>

	<button class="absolute flex items-center justify-center w-20 h-20 -mt-10 border-8 p-4 border-[#192741] rounded-full bg-primary transition-all hover:bg-primary-hover active:bg-primary-active active:scale-95"
		on:click={() => goto('/profile')}
	>
		<UnionIcon />
	</button>

	<a
		class="flex flex-col [&>*]:transition-all transition-all items-center justify-center text-white
		{$page.route.id === '/become' ? '[&>*]:fill-white' : '[&>*]:fill-light-text'}"
		href="/become"
	>
		<AddIcon />

		<span class="mt-1 text-[10px] font-semibold {$page.route.id === '/become' ? '' : 'text-light-text'}">
			Add
		</span>
	</a>
</div>