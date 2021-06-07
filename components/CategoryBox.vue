<template>
	<div id="category-box" class="base-border">
		<h2>Categories</h2>
		<hr>
		<ul>
			<li>
				<input type="checkbox" v-model="allChecked" id="chk-all">
				<label for="chk-all">All</label>
			</li>
			<li v-for="(value, category) in categoryData" :key="category" v-if="typeof category == 'string'">
				<input type="checkbox" v-model="categoryData[category]" :id="`chk-${category}`">
				<label v-text="category" :for="`chk-${category}`" />
			</li>
		</ul>
	</div>
</template>

<script>
const categoryData = {};
let allChecked = true;
export default {
	name: 'categoryBox',
	props: ['categories'],
	data() {
		for (const category of this.categories)
			categoryData[category] = false;
		return { categoryData, allChecked };
	},
	methods: {
		cat2Obj(data, newCats, parrent=null) {
			for (let cat of newCats) {
				if (typeof cat == 'string') {
					if (parrent != null) {
						data[cat] = [false, parrent]
						console.log('HERE', cat)
					} else {
						data[cat] = false
					}
				} else {
					data[cat[0]] = false
					this.cat2Obj(data, cat.slice(1), cat[0])
				}
			}
			return data;
		}
	}
}
</script>

<style scoped>
	#category-box {
		background: var(--main-bkg);
		display: inline-block;
		/* margin: 1em; */
		padding: 1em;
		min-width: 275px;
	}
	ul {
		list-style-type: none;
		text-transform: capitalize;
	}
	li {
		margin: 0.5em;
	}
	input:checked ~ label {
		color: green;
	}
</style>
