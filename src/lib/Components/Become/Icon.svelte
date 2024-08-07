<script>
	export let iconUrl = "/icons/wallet.png";
</script>

<div
	class="rounded-full fixed p-[94px] w-[150vw] h-[150vw] shadow-gray-900/10 bg-gradient-to-t from-transparent shadow-lg to-primary/10 transform -mt-20 -translate-x-[20.25%] scale-105"
>
	<div
		class="w-full h-full rounded-full bg-gradient-to-t shadow-gray-900/10 from-transparent to-primary/20 p-[94px] shadow-lg flex items-center justify-center"
	>
		<div
			class="flex items-center justify-center w-full h-full rounded-full bg-primary/10"
		>
			<div
				class="h-[134px] w-[134px] flex items-center justify-center rounded-full bg-primary/40"
			>
				<img class="rounded-full" src={iconUrl} alt="icon" />
			</div>
		</div>
	</div>
</div>