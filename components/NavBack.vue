<template>
	<div class="navback">
		<nuxt-link :to="path">
			<strong>
				<font-awesome-icon :icon="['fas', 'arrow-left']" /> Return to {{ text }}
			</strong>
		</nuxt-link>
	</div>
</template>

<script>
export default {
	name: 'NavBack',
	props: ['text', 'path']
}
</script>

<style scoped>
.navback {
	border-bottom: 3px solid var(--main-color);
	margin-bottom: 0.25em;
}
a {
	text-decoration: none;
	color: inherit;
	font-weight: bold;
}
</style>
