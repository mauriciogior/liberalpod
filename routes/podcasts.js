
module.exports = function(router) {

	router.get('/podcasts', async function(ctx) {
		await ctx.render('podcasts', { locals: { user: ctx.request.user } })
	})

}
