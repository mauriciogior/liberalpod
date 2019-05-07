const userModel = require('../models/user.js')

module.exports = function(router) {

	// Authentication route
	router.use(async function(ctx, next) {
		var token = ctx.cookies.get('token')

		// Revoke access
		if (!token) {

			// If from API, returns 401
			if (ctx.request.url.indexOf('/api/') !== -1) {
				return ctx.status = 401;
			}

			if (ctx.request.url != '/login') {
				await ctx.redirect('/login')
			} else {
				await next()
			}

		} else {
			// Verifies if token is valid
			var user = await userModel.get(token)

			if (!user) {
				ctx.cookies.set('token', undefined)
				await ctx.redirect('/login')

			} else {

				ctx.request.locals = {
					user: user,
					podcast: user.podcasts[0]
				}

				if (ctx.request.url == '/login') {
					await ctx.redirect('/episodes')
				} else {
					await next()
				}

			}
		}
	})

}
