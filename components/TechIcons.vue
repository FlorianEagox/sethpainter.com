<template>
	<ul id="icons">
		<li class="tooltip" :title="icon" v-for="icon in icons" :key="icon">
			<img
				
				:src="require(`devicon/icons/${icon.split('-')[0]}/${icon.includes('-') ? icon : `${icon}-original`}.svg`)"/>
		</li>
	</ul>
</template>

<script>

export default {
	props: ['icons']
}
</script>

<style scoped>
	#icons {
		list-style-type: none;
		display: flex;
		justify-content: center;
		justify-self: flex-start;
	}
	#icons img {
		width: 2em;
		margin: 0 0.3em;
		display: block;
	}
</style>