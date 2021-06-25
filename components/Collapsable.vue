<template>
	<div class="collapseable">
		<slot name="before" />
		<button id="btn-collapse" @click="collapsed = !collapsed">
			<slot name="btn" v-if="this.$slots.btn" />
			<font-awesome-icon :icon="['fas', 'sort-down']" size="2x" />
		</button>
		<hr v-if="this.hr">
		<slot v-if="!collapsed" />
	</div>
</template>

<script>
export default {
	props: {
		hr: { default: true }
	},
	data() {
		return { collapsed: false }
	},
	mounted() {
		window.onresize = () => {
			this.collapsed = window.innerWidth < 767;
			this.$emit("resize", this.collapsed)
		}
		window.onresize();
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