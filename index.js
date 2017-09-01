// install marko's node require hook
require('marko/node-require').install()

// load .env config file (extends process.env with custom env variables)
require('dotenv-safe').load()
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

const path = require('path')

// logger
const { createLogger, stdSerializers } = require('bunyan')
const logger = createLogger({
  name: 'panel',
  serializers: stdSerializers,
  src: process.env.NODE_ENV === 'development',
  stream: process.stderr,
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'warn'
})

// webapplication
const Koa = require('koa')
const mount = require('koa-mount')
const app = new Koa()

app.use(require('koa-static')(path.join(__dirname, 'public')))

/*
const express = require("express")
const expressVue = require("express-vue")
const path = require("path")
global.config = require("./config.json")
const { Client, Pool } = require("pg")
global.pg_pool = new Pool(config.db)
global.helpers = require("./helpers")
global.userMap = {}
const WebsocketServer = require("./backend/websocket")

const Strategy = require("passport-discord").Strategy
const passport = require("passport")
const session = require("express-session")

const strategy = new Strategy(
  {
    clientID: global.config.appinfo.id,
    clientSecret: global.config.appinfo.secret,
    callbackURL: global.config.appinfo.callback,
    scope: ["identify"],
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      return done(null, profile)
    })
  }
)

passport.use(strategy)

const app = express()

app.use(
  session({
    secret: global.config.appinfo.othersecret,
    resave: false,
    saveUninitiated: true,
    cookie: {
      secure: false,
      maxAge: 86400000,
      httpOnly: false,
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})

app.set("views", path.join(__dirname, "app", "views"))
app.set("vue", {
  componentsDir: path.join(__dirname, "app", "components"),
  defaultLayout: "layout",
})

app.engine("vue", expressVue)
app.set("view engine", "vue")

app.use(express.static("public"))
*/

// app.use('/api', require('./routes/api'))
// TODO: app.use(mount('/api', null))
// app.use("/", require("./routes/main"))
const template = require('./client/index.marko')
app.use(async (ctx, next) => {
  ctx.type = 'html'
  ctx.body = template.stream(
    {
      // TODO: pass required parameters!
    }
  )
})

/*
TODO: jwt compat
app.get(
  "/login",
  passport.authenticate("discord", {
    scope: ["identify"],
  })
)
app.get(
  "/callback",
  passport.authenticate("discord", {
    failureRedirect: "/",
  }),
  async (req, res) => {
    console.log("A user has authenticated")
    let rows = await global.pg_pool.query("SELECT token, salt FROM public.user WHERE id = $1", [req.user.id])
    if (rows.rows.length === 0) {
    }
    global.userMap[req.sessionID] = req.user.id
    res.redirect("/")
  }
)

const websocketServer = new WebsocketServer(app)
*/

const port = process.env.PORT
app.listen(port, () => logger.info({ port }, 'app listening'))

// require('./bot')
