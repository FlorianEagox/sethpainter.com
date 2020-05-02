<template>
	<div class="page-tag base-border">
		<h1>{{text}}</h1>
	</div>
</template>

<script>
export default {
	name: 'PageHeader',
	props: ['text']
}
</script>

<style scope>
.page-tag {
	display: inline-block;
	margin: 0 auto;
	background: var(--main-bkg);
	padding: 0.5em 3em;
	border-bottom-width: 0.3em;
	margin-bottom: var(--margin-buffer-desktop);
}
</style>