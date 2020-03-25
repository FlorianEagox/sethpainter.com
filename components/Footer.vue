<template>
	<footer>
		<div class="container">
			<div class="content">
				<p id="copy">
					<strong>&copy; Seth Painter - 2020</strong>
				</p>
			</div>
			<div id="external">
				<p>Find me elsewhere</p>
				<nav>
					<ul>
						<li>
							<a href="https://github.com/TheFoxarmy">
								<font-awesome-icon :icon="['fab', 'github']" />
							</a>
						</li>
						<li>
							<a href="https://www.youtube.com/c/thefoxarmy11">
								<font-awesome-icon :icon="['fab', 'youtube']" />
							</a>
						</li>
						<li>
							<a href="mailto: seth@sethpainter.com">
								<font-awesome-icon :icon="['fas', 'envelope']" />
							</a>
						</li>
						<li>
							<a href="https://www.upwork.com/o/profiles/users/_~01a3effb5d2b8cbd3a/">
								<span>
									<img
										src="https://cdn2.iconfinder.com/data/icons/picons-social/57/79-upwork-2-512.png"
										alt="Upwork"
									>
								</span>
							</a>
						</li>
						<li>
							<a href="https://twitter.com/FlorianEagox">
								<font-awesome-icon :icon="['fab', 'twitter']" />
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	name: 'Footer'
};
</script>

<style>
footer {
	background: var(--dark-bkg);
	color: var(--white-txt);
	padding: 2.5em;
}
footer .container {
	display: flex;
	justify-content: space-between;
}
footer .content {
	text-align: center;
	align-self: center;
	flex-basis: 55%;
}
#external {
	font-size: 1.25em;
	border-left: solid 1px white;
	padding-left: 2.5em;
	margin: auto;
	/* flex-basis: 40%; */
}
#external ul {
	list-style-type: none;
}
#external li {
	display: inline;
	font-size: 1.5em;
	margin: auto 0.1em;
}
#external a {
	color: var(--white-txt);
}
#external a img {
	filter: invert(100%);
	width: 1em;
}
#external a img:hover {
	filter: invert(75%);
}
#external a:active,
#external a:hover {
	color: #aaa;
}
@media (max-width: 770px) {
	.container {
		text-align: center;
		flex-direction: column;
		width: 100%;
	}
	footer .content {
		border-bottom: 1px solid white;
		padding-bottom: 1em;
		margin-bottom: 1em;
		width: 100%;
	}
	#external {
		border: none;
		width: 100%;
		padding: 0;
	}
}
</style>
