<template>
	<div class="toast">
		{{text}}
	</div>
</template>

<script>
export default {
	props: ["text"]
}
</script>

<style scoped>
	.toast {
		padding: 1em;
	}
	.toast .success {
		background: green;
		color: white;
		border-radius: 10px;
	}
	.toast.error {
		background: red;
		color: white;
	}
</style>