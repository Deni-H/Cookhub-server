export interface User {
    user_name: string,
    first_name: string,
    last_name: string,
    bio: string,
    profile_image: string
}

export interface UserDetails extends User {
    email: string
}