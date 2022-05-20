import Koa from 'koa';
import fetch from 'node-fetch';
import {generateApiResponse} from './lib.js'
const app = new Koa();
const LISTEN_PORT = process.env['LISTEN_PORT'] || 8000

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error(error)
    ctx.status = 500
    ctx.body = error.message || "Unknown error"
  }
})

app.use(async (ctx) => {
  const response = await fetch('https://directory.spineservices.nhs.uk/STU3/Organization/N81082')
  const jsonResponseBody = await response.json();
  ctx.status = 200
  ctx.body = generateApiResponse(jsonResponseBody.extension)
})

app.listen(LISTEN_PORT)