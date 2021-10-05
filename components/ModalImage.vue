<template>
	<div v-if="visible" id="modal" class="modal">
		<font-awesome-icon id="close" @click="visible = false" :icon="['fas', 'times']" class="fa-2x" />
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
		};
	}
}
</script>

<style scoped>
	#modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		display: grid;
	}
	#close {
		font-weight: bolder;
		color: white;
		position: absolute;
		right: 0;
		top: 0;
		margin: 10px;
		cursor: pointer;
	}
	img {
		left: 50%;
		transform: translate3d(0, 0, 0);
		animation: zoomin 1s ease;
		width: 90vw;
		height: 90vh;
		object-fit: contain;
		margin: auto;
		z-index: 20;
	}
</style>
