<script>
	import Chart from 'chart.js/auto'	
	import { onMount } from 'svelte'

	let chartEl

	export let data

	onMount(() => {
		const ctx = chartEl.getContext("2d");

		if (!ctx) return;

		var gradient = ctx.createLinearGradient(0, 0, 0, 208);
		gradient.addColorStop(0, "#3f72d1");
		gradient.addColorStop(0.5, "black");

		new Chart(ctx, {
			type: "line",
			data: {
				labels: data,
				datasets: [
					{
						data,
						backgroundColor: gradient,
						fill: true,
						cubicInterpolationMode: "monotone",
						tension: 0.4,
						borderColor: "#3076F7",
					},
				],
			},
			options: {
				elements: {
					point: {
						radius: 0,
					},
				},
				scales: {
					y: {
						beginAtZero: true,
						grid: {
							display: false,
						},
						ticks: {
							display: false,
						},
					},
					x: {
						grid: {
							display: false,
						},
						ticks: {
							display: false,
						},
					},
				},
				plugins: {
					tooltip: {
						enabled: false,
					},
					legend: {
						display: false,
					},
				},
			},
		});
	});
</script>

<div
	class="max-w-[208px] overflow-hidden flex flex-col items-center justify-center"
>
	<canvas bind:this={chartEl}></canvas>
</div>
