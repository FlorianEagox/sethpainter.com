
export default ({app}) => {
	console.log("letsa go")
	app.router.beforeEach((to, from, next) => {
		console.log("SCOOP",to.path)
		if(to.matched.some(record => record.name.includes("poetry"))) {
			console.log("Plugin time!")
			to.meta.preprocessMarkdown = content => {
				return content.replace(/([^\n])\n([^\n])/g, '$1\n\n$2');
			}
		} else if(to.matched.some(record => record.name === "project")) {
			to.meta.preprocessMarkdown = content => {
				// const repoReadme
				// return content.replace(/([^\n])\n([^\n])/g, '$1\n\n$2');
			}
		}
		next()


	});
}