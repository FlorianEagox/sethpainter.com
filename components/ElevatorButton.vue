<template>
	<button v-if="visible" id="elevator" class="base-border drop-shadow" v-scroll-to=" pageTitle ? '.title' : 'body'">
		<font-awesome-icon :icon="['fas', 'chevron-up']" size="lg" />
	</button>
</template>

<script>
export default {
	data() {
		return { visible: false, pageTitle: false }
	},
	mounted() {
		this.pageTitle = Boolean(document.querySelector('.title'));
		document.addEventListener('scroll', () =>
			this.visible = (window.scrollY > window.innerHeight)
		);
	}
}
</script>

<style>
	#elevator {
		position: fixed;
		bottom: 1em;
		right: 2em;
		padding: 1em;
		border: none;
	}
	@media(min-width: 1500px) {
		#elevator {
			right: 10%;
		}
	}
</style>

