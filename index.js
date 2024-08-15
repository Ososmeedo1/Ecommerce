import express from 'express'
const app = express()
const port = process.env.PORT||3000
import { bootstrap } from './src/modules/bootstarp.js'
bootstrap(app,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))