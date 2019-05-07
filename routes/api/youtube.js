const axios = require('axios')

module.exports = function(router) {

	router.get('/api/youtube', async function(ctx) {
		let youtubeId = ctx.request.locals.user.youtubeId
		let url = 'https://www.googleapis.com/youtube/v3/playlistItems?'
		url += `playlistId=${youtubeId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet&maxResults=10`

		// Grab last 10 episodes from YouTube
		try {
			let response = await axios.get(url)

			return ctx.body = response.data.items.map(function(item) {
				return {
					id: item.snippet.resourceId.videoId,
					title: item.snippet.title,
					description: item.snippet.description,
					thumbnail: item.snippet.thumbnails.standard || item.snippet.thumbnails.high || item.snippet.thumbnails.default,
					date: item.snippet.publishedAt
				}
			})

		} catch(error) {
			ctx.status = error.response.status
			return ctx.body = { error: error.response.statusText }

		}
	})

	router.get('/api/youtube/:id', async function(ctx) {
		let videoId = ctx.params.id
		let url = 'https://www.googleapis.com/youtube/v3/videos?'
		url += `id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`

		// Grab last 10 episodes from YouTube
		try {
			let response = await axios.get(url)

			let list = response.data.items.map(function(item) {
				return {
					id: item.id,
					title: item.snippet.title,
					description: item.snippet.description,
					thumbnail: item.snippet.thumbnails.standard || item.snippet.thumbnails.high || item.snippet.thumbnails.default,
					date: item.snippet.publishedAt
				}
			})

			if (list.length > 0) {
				return ctx.body = list[0]
			}

			ctx.status = 404
			return ctx.body = { error: 'Video not found.' }

		} catch(error) {
			console.log(error)
			ctx.status = error.response.status
			return ctx.body = { error: error.response.statusText }

		}
	})

}