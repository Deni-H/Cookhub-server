export interface Recipe {
    creator: string,
    title: string,
    description: string,
    image: string,
    video?: string,
    created_at: number,
    cookTime: {
        time_unit: number,
        value: number
    },
    ingredients: {
        [ingredientName: string]: {
            weight_unit: number,
            value: number
        }
    }
}