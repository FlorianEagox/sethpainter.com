<template>
	<div class="collapseable">
		<slot name="before" />
		<button id="btn-collapse" @click="collapsed = !collapsed"><font-awesome-icon :icon="['fas', 'sort-down']" size="2x" /></button>
		<hr>
		<slot v-if="!collapsed" />
	</div>
</template>

<script>
export default {
	data() {
		return { collapsed: false }
	},
	mounted() {
		this.collapsed = window.innerWidth < 767;
	}
}
</script>

<style scoped>
	.collapseable > :first-child {
		display: inline-block;
	}
	button {
		background: none;
		border: none;
	}
</style>