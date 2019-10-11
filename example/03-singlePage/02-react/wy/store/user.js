import { observable, computed, action, autorun, when } from 'mobx'
import {
	setCountry
} from '../i18n'
import {
	getUserDetail
} from "../api/user";

class User {
	@observable data = {}
	@action
	async fetch(){
		let {
			data,status
		} = await getUserDetail()
		setCountry(data.country)
		this.data = data
	}
}

const user = new User()

export default user


