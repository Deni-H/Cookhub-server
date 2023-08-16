import express from "express"
import * as RecipeController from "../controllers/recipe-controller"

export const recipeRouter = express.Router()

recipeRouter.post("/recipe", RecipeController.addRecipe)