import axios from "axios";

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzMxMzc5OGY4MWM3NDY1MzI3NTllMTViOWYwZmYwZiIsIm5iZiI6MTc0ODkzODY4MS42MTMsInN1YiI6IjY4M2VhZmI5OWI4NzkxYmMzMzUzODk4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.trd7VQu6_dcCubqcPkqasHl5IUMXjlAizE0Y_lWT2Y8'

const tmdbAPI = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${TOKEN}`
    }
})

export async function fetchPopularMovies() {
    const { data } = await tmdbAPI.get('/movie/popular')
    return data
}


export async function fetchMovieBySearch(query) {
    const { data } = await tmdbAPI.get(`/search/movie?query=${query}&include_adult=false&language=en-US`)
    return data
}

export async function getMoviesByFilter(filter, page = 1) {
    const { data } = await tmdbAPI.get(`/movie/${filter}?page=${page}`)
    return data
}

export async function getMovies({
    filter,
    query,
    page
}) {
    if (query) return await fetchMovieBySearch(query, page)
    if (filter) return await getMoviesByFilter(filter, page)
    return fetchPopularMovies()
}