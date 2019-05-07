
module.exports = function(router) {

	router.get('/episodes', async function(ctx) {
		await ctx.render('episodes', ctx.request.locals)
	})

}