// Config env variables
require('dotenv').config()

const functions = require('firebase-functions')
const path = require('path')
const Koa = require('koa')
const serve = require('koa-static')
const views = require('koa-views')
const logger = require('koa-logger')
const router = require('koa-router')()
const koaBody = require('koa-body')
const app = new Koa()

app.use(logger())
app.use(koaBody({
	multipart: true,
	formLimit: '200mb'
}))
app.use(views('views', { extension: 'swig' }))
app.use(serve('public'))

// Set our auth
require('./internal/auth.js')(router)

// Set our routes
require('./routes/router.js')(router)

router.get('/', async function(ctx) {
	await ctx.redirect('/login')
})

app.use(router.routes())

// Run server
const server = app.listen(process.env.PORT, () => {
	console.log(`HITMers-server is running on port ${process.env.PORT}`)
})
