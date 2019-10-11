import music from './music'
let map = {
	music
}
let country = 'cn'
export const setCountry = (ct) => {
	country = ct
}
const i18n = (key) => {
	return map[key][country]
}

export default i18n
