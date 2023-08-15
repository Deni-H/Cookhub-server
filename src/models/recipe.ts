export interface Recipe {
    creator: string,
    title: string,
    description: string,
    image: string,
    video?: string,
    cookTime: {
        time_unit: number,
        value: number
    },
    ingredients: {
        [ingredientName: string]: {
            value: number
            weight_unit: string
        }
    }
}