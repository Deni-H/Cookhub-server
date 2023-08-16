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
        video: req.body.video,
        cookTime: req.body.cook_time,
        ingredients: req.body.ingredients
    }

    const addRecipe = await RecipeService.addRecipe(uid, recipe, currentTime)
    httpReponse.ok(addRecipe)
}