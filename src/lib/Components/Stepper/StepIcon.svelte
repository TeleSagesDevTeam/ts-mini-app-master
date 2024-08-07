<script>
	import { StepDoneIcon } from '$Icons/'

	export let status = ''
	export let number
</script>

{#if status === ''}
	<button class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-btn-muted">
		<span class="inline-flex items-center justify-center outline-transparent text-dark-text rounded-full outline outline-1 outline-offset- w-[50px] h-[50px] font-semibold">
			{number}
		</span>
	</button>
{/if}

{#if status === 'active'}
	<button class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-btn-muted">
		<span class="inline-flex items-center justify-center text-white rounded-full shadow-step-active w-[50px] h-[50px] font-semibold">
			{number}
		</span>
	</button>
{/if}

{#if status === 'done'}
	<button class="inline-flex items-center justify-center w-16 h-16 text-2xl rounded-full shadow-step-active shadow-primary bg-primary">
		<StepDoneIcon />
	</button>
{/if}


