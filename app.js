// Config env variables
require('dotenv').config()

const koa = require('koa')
const koaServe = require('koa-static')
const koaLogger = require('koa-logger')
const koaRouter = require('koa-router')()
const koaBody = require('koa-body')
const koaViews = require('koa-views');
const app = new koa()

app.use(koaLogger())
app.use(koaBody({
	multipart: true,
	formLimit: '200mb'
}))
app.use(koaViews(__dirname + '/views', { extension: 'pug' }));
app.use(koaServe('public'))

// Set our auth
require('./internal/auth.js')(koaRouter)

// Set our routes
require('./routes/router.js')(koaRouter)

koaRouter.get('/', async function(ctx) {
	await ctx.redirect('/login')
})

app.use(koaRouter.routes())

// Run server
const server = app.listen(process.env.PORT, () => {
	console.log(`HITMers-server is running on port ${process.env.PORT}`)
})
