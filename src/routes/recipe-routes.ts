import express from "express"
import * as RecipeController from "../controllers/recipe-controller"

export const recipeRouter = express.Router()

recipeRouter.post("/recipe", RecipeController.addRecipe)

recipeRouter.get("/recipe", RecipeController.getRecipe)

recipeRouter.get("/recipe/:recipeId", RecipeController.getRecipeById)

recipeRouter.post("/recipe/:recipeId/rating", RecipeController.addRating)

recipeRouter.get("/recipe/:recipeId/rating")