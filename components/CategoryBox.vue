<template>
	<collapsable id="category-box" class="base-border drop-shadow" ref="collapsable" @resize="resize" :hr="!minimal">
		<h2 slot="before" v-if="!minimal">Categories</h2>
		<font-awesome-icon v-else slot="btn" :icon="['fas', 'filter']" size="lg" title="categories" />
		<ul :class="{'base-border': minimal, 'drop-shadow': minimal}">
			<li>
				<input type="checkbox" v-model="allChecked" id="chk-all" @change="checkAll">
				<label for="chk-all">All</label>
			</li>
			<li v-for="(value, category) in categoryData" :key="category">
				<input type="checkbox" v-model="categoryData[category]" :id="`chk-${category}`" @change="uncheckAll">
				<label v-text="category" :for="`chk-${category}`" />
			</li>
		</ul>
	</collapsable>
</template>

<script>
import Collapsable from './Collapsable.vue';
let categoryData;
export default {
	components: { Collapsable },
	name: 'categoryBox',
	props: ['categories'],
	data() {
		categoryData = this.categories.reduce((categoriesObj, category) => {
			categoriesObj[category] = false;
			return categoriesObj;
		}, {});
		return {
			allChecked: true,
			categoryData,
			minimal: false
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
		},
		resize(collapsed) {
			this.minimal = collapsed;
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
		/* min-width: 275px; */
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
	@media (max-width: 768px) {
		#category-box {
			position: relative;
			padding: 0.5em;
		}
		ul {
			position: absolute;
			right: 0px;
			/* top: 0px; */
			background: inherit;
			padding: 0.5em;
			animation: growDown 300ms ease-in-out forwards;
    		transform-origin: top center;
			width: 175px;
		}
	}
	@keyframes growDown {
    0% {
        transform: scaleY(0)
    }
    80% {
        transform: scaleY(1.1)
    }
    100% {
        transform: scaleY(1)
    }
}

</style>
