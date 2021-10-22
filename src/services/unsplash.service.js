import Axios from 'axios'


const API_KEY = 'ZK0e9-HAhaTYuESu2zGuWRV-TT9fdamCnsRKiElNcwE'

export const unSplashService = {
    getInitialImgs,
    searchImgs
}

async function query(keyword = 'random', quantity = 30, start) {
    const res = await Axios.get(`https://api.unsplash.com/search/photos?query=${keyword}?&page=${start}&per_page=${quantity}}&client_id=${API_KEY}`)
    return res.data
}

async function getInitialImgs() {
    const { results } = await query();
    return Promise.resolve(
        results.map(img => {
            return { id: img.id, small: img.urls.small, full: img.urls.full }
        })
    )
}

async function searchImgs(keyword) {
    const { results } = await query(keyword);
    return Promise.resolve(
        results.map(img => {
            return { id: img.id, small: img.urls.small, full: img.urls.full }
        })
    )
}