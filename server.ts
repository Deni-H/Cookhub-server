import express from "express"
import { userRouter } from "./src/routes/user-routes"
import { checkAuthHeader } from "./src/middlewares/authentication"
import { jsonErrorMiddleware } from "./src/middlewares/json-error"

const port = process.env.port || 3000
const app = express()
const routerV1 = express.Router()

app.use(express.json())
app.use(jsonErrorMiddleware)
app.use(checkAuthHeader)

routerV1.use("/users", userRouter)
app.use("/api/v1", routerV1)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})