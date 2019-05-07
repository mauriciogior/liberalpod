const episodeModel = require('../../models/episode.js')

module.exports = function(router) {

	router.get('/api/episodes', async function(ctx) {
		return ctx.body = await episodeModel.get(ctx.request.locals.user)
	})

	router.post('/api/episodes', async function(ctx) {
		if (!ctx.request.files || !ctx.request.files.file) {
			ctx.status = 406
			return ctx.body = { error: 'Please fill all required fields.' }
		}

		var file = ctx.request.files.file
		var path = file.path
		var name = file.name
		var type = file.type
		var body = ctx.request.body

		if (type != 'audio/mp3') {
			ctx.status = 406
			return ctx.body = { error: 'Only .mp3 files are allowed.' }
		}

		var episode = {
			title: body.title,
			description: body.description,
			source: 'file',
			fileId: new Date().getTime(),
			date: body.date
		}

		var result = await episodeModel.put(ctx.request.locals.user, episode)
		if (!result) {
			ctx.status = 406
			return ctx.body = { error: 'Try again later.' }
		}

		episode.id = result.id
		return ctx.body = episode
	})

}