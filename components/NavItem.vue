<template>
	<li class="fluent-border"><a class="fluent" :href="location">{{text}}</a></li>
</template>

<script>

export default {
	name: "NavItem",
	props: ["location", "text"]
}

</script>

<style scoped>
li {
	display:inline-block;
	padding:1.25em;
	margin: auto 0.5em;
	transition: all 200ms ease;
}
li:hover {
	background:#222;
	font-weight:bold;
}
a {
	color:white;
	text-decoration:none;
}
</style>