<template>
	<div class="container">
		<PageHeader text="Resume" />
		<p id="download">
			Download as PDF <a href="/resume anonymized.pdf" class="accent">here</a>
		</p>
		<div ref="container" id="wrapper">
			<Resume id="resume" class="drop-shadow" ref="resume" />
		</div>
	</div>
</template>

<script>
import Resume from '~/components/resume';

export default {
	components: {Resume},
	mounted() {
		// setTimeout(this.applyScaling(), 2000)
	},
	methods: {
		applyScaling() {
			const scaledWrapper = this.$refs.container;
			const scaledContent = document.querySelector('#resume');
			const { width: cw, height: ch } = scaledContent.getBoundingClientRect();
			const { width: ww, height: wh } = scaledWrapper.getBoundingClientRect();

			const scale = Math.min(ww / cw, wh / ch);
			console.log({cw, ch, ww, wh, scale})
			// scaledContent.style.transform = `scale(${scale})`;
		}
	}
}
</script>

<style scoped>
.container {
}
#wrapper {
	/* height: 500px; */
	/* resize: both; */
	margin: 1em;
	overflow: auto;
}
#resume {
	--left-pad: 15px;
	font-family: Arimo, Arial;
	text-align: left;
	line-height:initial;
	min-width: 216mm;
	/* height: 279mm; */
	/* transform: scale(0.5); */
	max-width: 1200px;
	margin: 1em auto;
}
#download {
	text-align: center;
}
</style>
