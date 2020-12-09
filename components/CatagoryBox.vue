<template>
	<div id="catagory-box" class="base-border">
		<h2>Catagories</h2>
		<hr>
		<ul>
			<li>
				<input type="checkbox" v-model="allChecked" id="chk-all">
				<label for="chk-all">All</label>
			</li>
			<li v-for="(value, catagory) in catagoryData" :key="catagory" v-if="typeof catagory == 'string'">
				<input type="checkbox" v-model="catagoryData[catagory]" :id="`chk-${catagory}`">
				<label v-text="catagory" :for="`chk-${catagory}`" />
			</li>
		</ul>
	</div>
</template>

<script>
const catagoryData = {};
let allChecked = true;
export default {
	name: 'CatagoryBox',
	props: ['catagories'],
	data() {
		for (const catagory of this.catagories)
			catagoryData[catagory] = false;
		return { catagoryData, allChecked };
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

<style>
	#catagory-box {
		background: var(--main-bkg);
		/* display: inline-block; */
		margin: 1em;
		padding: 1em;
		min-width: 250px;
	}
	ul {
		list-style-type: none;
	}
	li {
		margin: 0.5em;
	}
	input:checked ~ label {
		color: green;
	}
</style>
