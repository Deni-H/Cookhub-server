"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRatings = exports.addRating = exports.getRecipeById = exports.getRecipe = exports.addRecipe = void 0;
const http_response_1 = require("../utils/http-response");
const RecipeService = __importStar(require("../services/recipe-service"));
const util_1 = require("../utils/util");
const addRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const httpReponse = new http_response_1.HttpReponse(res);
    const uid = res.locals.uid;
    const currentTime = (0, util_1.getCurrentTime)();
    const recipe = {
        creator: uid,
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        created_at: currentTime,
        cookTime: req.body.cook_time,
        ingredients: req.body.ingredients
    };
    const video = req.body.video;
    if (video)
        recipe.video = video;
    const addRecipe = yield RecipeService.addRecipe(uid, recipe, currentTime);
    httpReponse.ok(addRecipe);
});
exports.addRecipe = addRecipe;
const getRecipe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const httpReponse = new http_response_1.HttpReponse(res);
    const last = req.query.last;
    let result;
    if (last)
        result = yield RecipeService.getRecipes(Number(last));
    else
        result = yield RecipeService.getFirstRecipe();
    httpReponse.ok(result);
});
exports.getRecipe = getRecipe;
const getRecipeById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const httpReponse = new http_response_1.HttpReponse(res);
    const recipeId = req.params["recipeId"];
    const recipe = yield RecipeService.getRecipeById(recipeId);
    if (recipe.exists)
        return httpReponse.ok(recipe.data());
    else
        return httpReponse.notFound();
});
exports.getRecipeById = getRecipeById;
const addRating = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const httpReponse = new http_response_1.HttpReponse(res);
    const userId = res.locals.uid;
    const recipeId = req.params["recipeId"];
    const rating = req.body.rating;
    const review = req.body.review;
    const currentTime = (0, util_1.getCurrentTime)();
    const ratings = {
        user_id: userId,
        rating: rating,
        review: review,
        created_at: currentTime
    };
    const isRecipeExists = yield RecipeService.isRecipeExists(recipeId);
    if (!isRecipeExists)
        httpReponse.notFound();
    httpReponse.ok(yield RecipeService.addRating(userId, recipeId, ratings));
});
exports.addRating = addRating;
const getRatings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const httpReponse = new http_response_1.HttpReponse(res);
    const recipeId = req.params["recipeId"];
    const last = req.query.last;
    let result;
    const isRecipeExists = yield RecipeService.isRecipeExists(recipeId);
    if (!isRecipeExists)
        return httpReponse.notFound();
    if (last)
        result = yield RecipeService.getRatings(recipeId, Number(last));
    else
        result = yield RecipeService.getFirstRatings(recipeId);
    httpReponse.ok(result);
});
exports.getRatings = getRatings;
