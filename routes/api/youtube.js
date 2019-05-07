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

}