"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRecipeExists = exports.getRatings = exports.getFirstRatings = exports.addRating = exports.getRecipeById = exports.getRecipes = exports.getFirstRecipe = exports.addRecipe = void 0;
const firebase_admin_1 = __importDefault(require("./firebase-admin"));
const firestore = firebase_admin_1.default.firestore();
const addRecipe = (creatorId, recipe, createdAt) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeRef = firestore.collection("recipes").doc();
    const recipeId = recipeRef.id;
    yield recipeRef.create(recipe);
    return yield firestore
        .collection("users").doc(creatorId)
        .collection("recipes").doc(recipeId)
        .create({
        id: recipeId,
        created_at: createdAt
    });
});
exports.addRecipe = addRecipe;
const getFirstRecipe = () => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield firestore.collection("recipes").orderBy("created_at").limit(20).get();
    return recipes.docs.map((doc) => doc.data());
});
exports.getFirstRecipe = getFirstRecipe;
const getRecipes = (last) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield firestore.collection("recipes").orderBy("created_at").startAfter(last).limit(20).get();
    return recipes.docs.map((doc) => doc.data());
});
exports.getRecipes = getRecipes;
const getRecipeById = (recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield firestore.collection("recipes").doc(recipeId).get();
});
exports.getRecipeById = getRecipeById;
const addRating = (userId, recipeId, rating) => __awaiter(void 0, void 0, void 0, function* () {
    return yield firestore.collection("recipes").doc(recipeId).collection("ratings").doc(userId).create(rating);
});
exports.addRating = addRating;
const getFirstRatings = (recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield firestore
        .collection("recipes").doc(recipeId)
        .collection("ratings")
        .orderBy("created_at")
        .limit(20)
        .get();
    return recipes.docs.map((doc) => doc.data());
});
exports.getFirstRatings = getFirstRatings;
const getRatings = (recipeId, last) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield firestore
        .collection("recipes").doc(recipeId)
        .collection("ratings")
        .orderBy("created_at")
        .startAfter(last)
        .limit(20)
        .get();
    return recipes.docs.map((doc) => doc.data());
});
exports.getRatings = getRatings;
const isRecipeExists = (recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield firestore.collection("recipes").doc(recipeId).get();
    return recipe.exists;
});
exports.isRecipeExists = isRecipeExists;
