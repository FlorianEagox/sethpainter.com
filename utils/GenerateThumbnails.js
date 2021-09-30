import sharp from 'sharp'
import images from '../assets/florianImages.json'

async function generateThumbnails(basePath = '', images, maxHeight = 250) {
	images.forEach(image => {
			sharp(`${basePath}/${image}`)
				.resize(null, maxHeight)
				.toFile(`${basePath}/thumbnails/${image}`)
				.catch(e => console.error(e));
	});
}
generateThumbnails('static/images/florian', images.map(image => image.path))