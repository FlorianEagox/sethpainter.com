<template>
	<button v-if="visible" id="elevator" class="base-border drop-shadow" v-scroll-to="'.title' || 'h2' || 'h1'">
		<font-awesome-icon :icon="['fas', 'chevron-up']" size="lg" />
	</button>
</template>

<script>
export default {
	data() {
		return { visible: false }
	},
	mounted() {
		document.addEventListener('scroll', () =>
			this.visible = (window.scrollY > window.innerHeight / 2)
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

