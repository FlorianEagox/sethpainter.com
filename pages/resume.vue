<template>
	<div class="container">
		<div id="wrapper" class="panel">
			<PageHeader text="Resume" />
			<!-- <embed ref="resume" src="https://static.sethpainter.com/resume.pdf" type="application/pdf"> -->
			<iframe ref="resume" src="https://static.sethpainter.com/resume" frameborder="0"></iframe>
			<p id="download">
				Download as PDF <a href="/resume anonymized.pdf" class="accent">here</a>
			</p>
		</div>
	</div>
</template>

<script>
import PageHeader from '../components/PageHeader';
export default {
	components: { PageHeader },
	mounted() {
		const resume = this.$refs.resume;
		resume.height = resume.clientWidth * (11 / 8.5);
		console.log(resume.clientWidth, resume.height)
		window.addEventListener('resize', () => {
			resume.height = resume.clientWidth * (11 / 8.5);
		});
	}
}
</script>

<style scoped>
#wrapper {
	background: var(--body-bkg);
	display: flex;
	flex-direction: column;
	width: 100%;
}

iframe {
	margin: auto;
	border: 1px solid black;
	width: 50%;
	/* height: calc(100% * (11 / 8.5)); */
}
@media (max-width: 768px) {
	iframe {
		width: 100%;
	}
}
</style>