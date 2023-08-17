import { Rating } from "../models/rating"
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

export const getRecipeById = async (recipeId: string) => {
    return await firestore.collection("recipes").doc(recipeId).get()
}

export const addRating = async (userId: string, recipeId: string, rating: Rating) => {
    return await firestore.collection("recipes").doc(recipeId).collection("ratings").doc(userId).create(rating)
}

export const getFirstRatings = async (recipeId: string) => {
    const recipes = await firestore
        .collection("recipes").doc(recipeId)
        .collection("ratings")
        .orderBy("created_at")
        .limit(20)
        .get()

    return recipes.docs.map((doc) => doc.data())
}

export const getRatings = async (recipeId: string, last: number) => {
    const recipes = await firestore
        .collection("recipes").doc(recipeId)
        .collection("ratings")
        .orderBy("created_at")
        .startAfter(last)
        .limit(20)
        .get()

    return recipes.docs.map((doc) => doc.data())
}

export const isRecipeExists = async (recipeId: string) => {
    const recipe = await firestore.collection("recipes").doc(recipeId).get()
    return recipe.exists
}