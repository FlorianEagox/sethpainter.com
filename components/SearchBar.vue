<template>
	<div id="search-bar" class="side-border drop-shadow">
		<font-awesome-icon :icon="['fas', 'search']"/>
		<input type="search" id="txt-search" placeholder="Search">
	</div>
</template>

<script>
export default {
	name: 'SearchBar'
}
</script>

<style scoped>
	#search-bar {
		width: 100%;
		display: flex;
		align-items: center;
		background: var(--main-bkg);
		grid-area: search;
	}
	svg {
		margin: 0 0.5em;
	}
	#txt-search {
		display: block;
		border: none;
		padding: 1em 0;
		flex: 1;
		outline: none;
		font-weight: bold;
		background: var(--main-bkg);
		color: inherit;
	}
</style>
