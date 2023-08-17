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

export const getFirstRecipe = async () => {
    const recipes = await firestore.collection("recipes").orderBy("created_at").limit(20).get()
    return recipes.docs.map((doc) => doc.data())
}

export const getRecipes = async (last: number) => {
    const recipes = await firestore.collection("recipes").orderBy("created_at").startAfter(last).limit(20).get()
    return recipes.docs.map((doc) => doc.data())
}