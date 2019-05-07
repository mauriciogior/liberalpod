
module.exports = function(router) {

	router.get('/login', async function(ctx) {
		await ctx.render('login')
	})

	router.post('/login', async function(ctx) {
		ctx.cookies.set('token', ctx.request.body.token)
		await ctx.redirect('/')
	})

	router.get('/logout', async function(ctx) {
		ctx.cookies.set('token', undefined)
		await ctx.redirect('/login')
	})

}
