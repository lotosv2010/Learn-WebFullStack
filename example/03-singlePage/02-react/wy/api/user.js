import request from '../config/request'


export const getUserDetail = params => request.get('/user/getUserDetail', {params})

