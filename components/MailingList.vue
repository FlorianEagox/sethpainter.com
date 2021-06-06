<template>
	<div id="mailing-list" class="side-border">
		<h3>Join my mailing list!</h3>
		<p>I'll send out occasional emails with new Articles, Projects, and Updates.</p>
		<div id="email-form">
			<input type="email" id="txt-email" placeholder="someone@example.com" v-model="email">
			<button @click="addToMailingList">
				<font-awesome-icon :icon="['fas', 'arrow-right']"/>
			</button>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import Toast from './Toast';

let email;
export default {
	data: {email},
	methods: {
		async addToMailingList() {
			const reqAdd = await fetch(`https://api.sethpainter.com/mailinglist/add/${this.email}`)
			const toastClass = Vue.extend(Toast);
			const mailStatusToast = new toastClass({ propsData: { 
				text: await reqAdd.text()
			}});
			mailStatusToast.$mount();
			mailStatusToast.$el.classList.add(reqAdd.ok ? 'success' : 'error');
			this.$el.appendChild(mailStatusToast.$el);
		}
	}
}
</script>

<style scoped>
	#mailing-list {
		background: var(--main-bkg);
		padding: 1em;
		font-size: 0.9em;
	}
	h3 {
		font-family: "Zilla Slab";
	}
	#email-form {
		display: flex;
		align-items: stretch;
		margin-top: 0.5em;
	}
	input[type=email] {
		flex: 1;
		padding: 0.2em;
		border: none;
		border-bottom: 2px solid green;
		outline: none;
		font-weight: bold;
		margin-right: 0.5em;
		font-size: 1em;
	}
	button {
		background: green;
		border: none;
		color: white;
		width: 2em;
		height: 2em;
	}
	button:hover {
		background: darkgreen;
		cursor: pointer;
	}
</style>