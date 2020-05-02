<template>
	<div id="wrapper" class="container panel">
		<PageHeader text="Florian" />
	</div>
</template>

<script>
import PageHeader from '../components/PageHeader';
export default {
	components: { PageHeader }
}
</script>

<style scoped>
#wrapper {
	background: var(--body-bkg);
	display: flex;
	flex-direction: column;
	width: 100%;
}
</style>