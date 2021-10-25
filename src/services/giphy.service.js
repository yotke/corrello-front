import Axios from 'axios'


const API_KEY = 'npWuiMqvXkQKgQJSBNktAgaf1Bhf2916'

export const giphyService = {
    getInitialGiphys,
    searchGiphys
}

async function query(keyword = 'random', limit = 32) {

    const res = await Axios.get(`https://api.giphy.com/v1/stickers/search?api_key=${API_KEY}&q=${keyword}&limit=${limit}`)
    return res.data
}

async function getInitialGiphys() {
    const results = await query();
    return Promise.resolve(
        results.data
    )
}

async function searchGiphys(keyword) {
    const results = await query(keyword);
    return Promise.resolve(
        results.data
    )
}