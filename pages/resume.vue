<template>
	<div class="container">
		<PageHeader text="Resume" />
		<p id="download">
			<a href="/resume anonymized.pdf" class="accent">
				<font-awesome-icon :icon="['far', 'file-pdf']" size="lg" />
				Download as PDF
			</a>
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
#holder {
	margin: 1em auto;
}
#wrapper {
	/* height: 500px; */
	/* resize: both; */
	margin: 1em;
	overflow: auto;
	padding: 1em;
}
#resume {
	color: black;
	--left-pad: 15px;
	font-family: Arimo, Arial;
	text-align: left;
	line-height:initial;
	min-width: 216mm;
	margin: auto;
	/* height: 279mm; */
	/* transform: scale(0.5); */
	max-width: 1200px;
	/* margin: 1em auto; */
}
#download {
	text-align: center;
}
#download a, #download a:visited {
	color: green;
}
@media (max-width: 1200px) {
	#resume {
		/* font-size: 0.1rem; */
	}
}
</style>
