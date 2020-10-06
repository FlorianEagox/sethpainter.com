<template>
	<div v-if="visible" class="modal">
		<img @click="visible = false" :src="image">

	</div>
</template>

<script>
let image = null;
export default {
	name: 'ModalImage',
	data() {
		return {
			visible: false,
			image
		}
	}
}
</script>

<style scoped>
	div {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		display: grid;
	}
	img {
		left: 50%;
		transform: translate3d(0, 0, 0);
		animation: zoomin 1s ease;
		max-width: 90%;
		max-height: 90%;
		margin: auto;
	}
</style>
