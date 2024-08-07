<script>
	import StepIcon from './StepIcon.svelte'

	export let activeStep = 1
	export let showActiveStep = true
</script>

<div class="flex overflow-visible">
	<StepIcon
		status={showActiveStep && activeStep === 1
			? 'active'
			: activeStep > 1
			  ? 'done'
			  : ''}
		number="01"
	/>

	<div class="space"></div>

	<StepIcon
		number="02"
		status={showActiveStep && activeStep === 2
			? "active"
			: activeStep > 2
			  ? "done"
			  : ""}
	/>

	<div class="space"></div>

	<StepIcon
		number="03"
		status={showActiveStep && activeStep === 3
			? "active"
			: activeStep > 3
			  ? "done"
			  : ""}
	/>

	<div class="space"></div>

	<StepIcon
		number="04"
		status={showActiveStep && activeStep === 4
			? "active"
			: activeStep > 4
			  ? "done"
			  : ""}
	/>
</div>

<style lang=postcss>
	.space {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		padding-inline: 0.5rem;
		position: relative;
		overflow: hidden;
		@apply h-16 w-full overflow-hidden;
	}

	.space::before {
		content: "";
		position: absolute;
		width: 80%;
		height: 100%;
		left: 50%;
		transform: translate(-50%, -50%);
		top: 50%;
		background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIyIiB2aWV3Qm94PSIwIDAgMzYgMiIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xIDFIMzUiIHN0cm9rZT0iIzRFNEU0RSIgc3Ryb2tlLW9wYWNpdHk9IjAuOCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1kYXNoYXJyYXk9IjUgNSIvPgo8L3N2Zz4=");
		background-position: center;
		background-repeat: repeat-x;
		background-size: 70px;
	}
</style>
