import { Request, Response, NextFunction } from "express"
import { StatusMessage, HttpReponse } from "../utils/http-response"
import * as RecipeService from "../services/recipe-service"
import { Recipe } from "../models/recipe"
import { getCurrentTime } from "../utils/util"
import { Rating } from "../models/rating"

export const addRecipe = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const httpReponse = new HttpReponse(res)
    const uid = res.locals.uid
    const currentTime = getCurrentTime()

    const recipe: Recipe = {
        creator: uid,
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        created_at: currentTime,
        cook_time: req.body.cook_time,
        ingredients: req.body.ingredients
    }

    const video = req.body.video as string
    if (video) recipe.video = video

    const addRecipe = await RecipeService.addRecipe(uid, recipe, currentTime)
    httpReponse.ok(addRecipe)
}

export const getRecipe = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const httpReponse = new HttpReponse(res)
    const last = req.query.last
    let result: FirebaseFirestore.DocumentData[]

    if (last) result = await RecipeService.getRecipes(Number(last))
    else result = await RecipeService.getFirstRecipe()

    httpReponse.ok(result)
}

export const getRecipeById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const httpReponse = new HttpReponse(res)
    const recipeId = req.params["recipeId"]

    const recipe = await RecipeService.getRecipeById(recipeId)
    if (recipe.exists) return httpReponse.ok(recipe.data()!)
    else return httpReponse.notFound()
}

export const addRating = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const httpReponse = new HttpReponse(res)

    const userId = res.locals.uid as string
    const recipeId = req.params["recipeId"]
    const rating = req.body.rating
    const review = req.body.review
    const currentTime = getCurrentTime()

    const ratings: Rating = {
        user_id: userId,
        rating: rating,
        review: review,
        created_at: currentTime
    }

    const isRecipeExists = await RecipeService.isRecipeExists(recipeId)
    if (!isRecipeExists) httpReponse.notFound()

    httpReponse.ok(await RecipeService.addRating(userId, recipeId, ratings))
}

export const getRatings = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const httpReponse = new HttpReponse(res)
    const recipeId = req.params["recipeId"]
    const last = req.query.last
    let result: FirebaseFirestore.DocumentData[]

    const isRecipeExists = await RecipeService.isRecipeExists(recipeId)
    if (!isRecipeExists) return httpReponse.notFound()

    if (last) result = await RecipeService.getRatings(recipeId, Number(last))
    else result = await RecipeService.getFirstRatings(recipeId)

    httpReponse.ok(result)
}