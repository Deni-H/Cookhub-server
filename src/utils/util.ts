export const dayToTimestamp = (day: number) => {
    return 60 * 60 * 24 * 1000 * day
}

export const getCurrentTime = () => {
    return new Date().getTime()
}