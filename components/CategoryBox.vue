<template>
	<div id="category-box" class="base-border drop-shadow">
		<h2>Categories</h2>
		<hr>
		<ul>
			<li>
				<input type="checkbox" v-model="allChecked" id="chk-all" @change="checkAll">
				<label for="chk-all">All</label>
			</li>
			<li v-for="(value, category) in categoryData" :key="category">
				<input type="checkbox" v-model="categoryData[category]" :id="`chk-${category}`" @change="uncheckAll">
				<label v-text="category" :for="`chk-${category}`" />
			</li>
		</ul>
	</div>
</template>

<script>
let categoryData;
export default {
	name: 'categoryBox',
	props: ['categories'],
	data() {
		categoryData = this.categories.reduce((categoriesObj, category) => {
			categoriesObj[category] = false;
			return categoriesObj;
		}, {});
		return {
			allChecked: true,
			categoryData
		}
	},
	methods: {
		checkAll() {
			if(this.allChecked)
				Object.keys(this.categoryData).forEach(category => this.categoryData[category] = false);
		},
		uncheckAll(e) {
			if(e.target.checked)
				this.allChecked = false;
		}
	},
}
</script>

<style scoped>
	#category-box {
		background: var(--main-bkg);
		display: inline-block;
		/* margin: 1em; */
		padding: 1em;
		min-width: 275px;
		grid-area: categories;
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
