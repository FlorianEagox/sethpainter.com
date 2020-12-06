//Converts the old JSON projects to new nuxt content project

const projectFile = require('./assets/projects.json');
const fs = require('fs');

projectFile.projects.forEach(project =>
	fs.writeFileSync(`./content/projects/${project.identifier}.md`,
`---
name: ${project.name}
description: ${project.short_description}
image: ${project.image}
access: ${project.access}
source: ${project.source}
${projectFile.featured.includes(project.identifier) ? 'featured: true' : '\b'}
---

${project.description}
`));