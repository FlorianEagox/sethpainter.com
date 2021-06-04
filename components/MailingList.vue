<template>
	<div id="mailing-list" class="side-border">
		<h3>Join my mailing list!</h3>
		<p>I'll send out occasional emails with new Articles, Projects, and Updates.</p>
		<div id="email-form">
			<input type="email" id="txt-email" placeholder="someone@example.com">
			<button>
				<font-awesome-icon :icon="['fas', 'arrow-right']"/>
			</button>
		</div>
	</div>
</template>

<script>
export default {

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