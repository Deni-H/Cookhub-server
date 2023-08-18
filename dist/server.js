"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("./src/routes/user-routes");
const recipe_routes_1 = require("./src/routes/recipe-routes");
const authentication_1 = require("./src/middlewares/authentication");
const json_error_1 = require("./src/middlewares/json-error");
const port = process.env.port || 3000;
const app = (0, express_1.default)();
const routerV1 = express_1.default.Router();
app.use(express_1.default.json());
app.use(json_error_1.jsonErrorMiddleware);
app.use(authentication_1.checkAuthHeader);
routerV1.use("/users", user_routes_1.userRouter);
routerV1.use("/recipes", recipe_routes_1.recipeRouter);
app.use("/api/v1", routerV1);
app.listen(port, () => {
    console.log(`Listening at PORT: ${port}`);
});
