<template>
	<div id="holder">
		<div class="page-tag base-border drop-shadow">
			<h1 class="title">{{text}}</h1>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PageHeader',
	props: ['text']
}
</script>

<style scope>
#holder {
	width: 100%;
	display: grid;
	place-items: center;
	padding: 0.5em;
	margin: var(--margin-buffer) 0;
}
.page-tag {
	display: grid;
	place-items: center;
	background: var(--main-bkg);
	padding: 0 3em;
	border-bottom-width: 0.3em;
	white-space: nowrap;
}
</style>