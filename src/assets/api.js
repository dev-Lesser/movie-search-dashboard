import axios from "axios"
import secret from './secret.json'
const BASE_URL = secret['API_URL']

export const get_daily_movies = async (dt) => {
    const url = `${BASE_URL}/dailyMovies?dt=${dt}`
    const result = await axios.get(url, {})
    if (result.status == 200) {
        const data = result.data
        if (data == null) return [false, null]
        const values = Object.values(data)
        const movielist = values.reduce((acc, curr) => acc.concat(curr), [])
        return [true, movielist]
    }
    return [false, null]
}

export const get_weekly_movies = async (dt) => {
    const url = `${BASE_URL}/weeklyMovies?dt=${dt}`
    const result = await axios.get(url, {})
    if (result.status == 200) {
        const data = result.data
        const values = Object.values(data)
        const movielist = values.reduce((acc, curr) => acc.concat(curr), [])
        return [true, movielist]
    }
    return [false, null]
}