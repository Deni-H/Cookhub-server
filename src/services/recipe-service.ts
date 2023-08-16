import { Recipe } from "../models/recipe"
import firebaseAdmin from "./firebase-admin"

const firestore = firebaseAdmin.firestore()

export const addRecipe = async (
    creatorId: string,
    recipe: Recipe,
    createdAt: number
) => {
    const recipeRef = firestore.collection("recipes").doc()
    const recipeId = recipeRef.id

    await recipeRef.create(recipe)
    return await firestore
        .collection("users").doc(creatorId)
        .collection("recipes").doc(recipeId)
        .create({
            id: recipeId,
            created_at: createdAt
        })
}