import axios from "axios"

const BASE_URL = ""

export const get_daily_movies = async (dt) => {
    const url = `${BASE_URL}/dailyMovies?dt=${dt}`
    const result = await axios.get(url, {})
    if (result.status == 200) {
        const data = result.data
        const values = Object.values(data)
        const movielist = values.reduce((acc, curr) => acc.concat(curr), [])
        return [true, movielist]
    }
    return [false, null]
}