<template>
	<div class="card-holder">
		<h2 class="label">{{label}}</h2>
		<div class="cards">
			<ContentCard
				v-for="project in cards"
				:key="project.identifier"
				:title="project.name"
				:description="project.short_description"
				:image="project.image"
				:location="'/project/' + project.identifier"
			/>
		</div>
	</div>
</template>

<script>
import ContentCard from './ContentCard'

export default {
	name: 'CardHolder',
	props: { cards: Array, label: String },
	components: {
		ContentCard
	},
	created() {
	}
}
</script>

<style scoped>
.card-holder {
	/* width: 100%; */
	margin: 0 1em;
}
.cards {
	display: flex;
	flex-wrap: nowrap;
	overflow-x: auto;
	box-shadow: 0 9px 0px 0px white, 0 -9px 0px 0px white, 12px 0 15px -4px rgba(31, 73, 125, 0.8), -12px 0 15px -4px rgba(31, 73, 125, 0.8);
	box-shadow: 12px 0 15px -4px rgba(31, 73, 125, 0.8), -12px 0 8px -4px rgba(31, 73, 125, 0.8);
}
.cards .card {
	flex: 0 0 40%;
	margin: 0 1em;
	line-height: 1.5;
	border: 1px solid black;
}
.label {
	margin: 1em;
	text-align: center;
}
</style>
