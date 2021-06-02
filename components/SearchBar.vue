<template>
	<input
		type="search"
		id="txt-search"
		class="side-border"
		placeholder="🔍 Search"
	>
</template>

<script>
export default {
	name: 'SearchBar'
}
</script>

<style scoped>
	#txt-search {
		display: block;
		width: 100%;
		border: none;
		margin: auto;
		padding: 1em;
	}
</style>