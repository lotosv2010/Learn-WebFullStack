import request from '../config/request'
export const getRecommendMusic = params => request.get('/music/getRecommendMusic', {params})

export const collectMusicById = params => request.get('/music/collectMusicById', {params})

export const getGroupMusic = params => request.get("/music/getGroupMusic",{params})
