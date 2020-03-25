<template>
	<div class="navback">
		<nuxt-link to="/projects">
			<strong>
				<font-awesome-icon :icon="['fas', 'arrow-left']" />
				Return to Projects
			</strong>
		</nuxt-link>
	</div>
</template>

<script>
export default {
	name: "NavBack"
}
</script>

<style scoped>
.navback {
	border-bottom: 3px solid black;
	margin-bottom: 0.25em;
}
a {
	text-decoration: none;
	color: black;
	font-weight: bold;
}
</style>
