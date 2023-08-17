import { Request, Response, NextFunction } from "express"
import { StatusMessage, HttpReponse } from "../utils/http-response"
import * as RecipeService from "../services/recipe-service"
import { Recipe } from "../models/recipe"
import { getCurrentTime } from "../utils/util"

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
        cookTime: req.body.cook_time,
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