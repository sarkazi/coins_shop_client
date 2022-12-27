import API from '../api/axiosBase'

export const getAllCategories = () => { return API.get('/categories') }
export const getOneCategory = (id) => { return API.get(`/categories/${id}`) }
export const updateCategory = (id, formData) => { return API.patch(`/categories/${id}`, formData) }
export const createCategory = () => { return API.post(`/categories`) }
export const deleteCategory = (id) => { return API.delete(`/categories/${id}`) }

export const createCart = (dto) => { return API.post(`/cart`, dto) }


export const getOneUser = (id) => { return API.get(`/users/${id}`) }


export const getAllCoins = (query) => { return API.get(`/coins?sort=${query}`) }
export const getCoinsByCart = (cart_id) => { return API.get(`/coins/by-cart/${cart_id}`) }
export const getCoinsByCat = (cat_id, take, skip) => { return API.get(`/coins/by-cat/${cat_id}/?take=${take}&skip=${skip}`) }
export const getSimilarCoins = (id) => { return API.get(`/coins/similar/${id}`) }
export const getOneCoin = (id) => { return API.get(`/coins/${id}`) }
export const updateCoin = (id, formData) => { return API.patch(`/coins/${id}`, formData) }
export const changeViewsCoin = (id) => { return API.patch(`/coins/change-views/${id}`) }
export const putCoinByCart = (dto) => { return API.patch(`/coins/put-coin-cart`, dto) }
export const createCoin = () => { return API.post(`/coins`) }
export const deleteCoin = (id) => { return API.delete(`/coins/${id}`) }
export const deleteCoinFromCart = (dto) => { return API.patch(`/coins/delete-from-cart`, dto) }



