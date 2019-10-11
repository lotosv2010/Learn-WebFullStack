import { observable, computed, action, autorun, when } from 'mobx'
import {
	getRecommendMusic,
	collectMusicById,
	getGroupMusic
} from '../api/music'
class Music {
	@observable recommendMusic = {
		name:'',
		author:'',
		background:'',
		type:'',
		alias:'',
		audio:''
	}
	@observable group1Id = 0
	@observable group2Id = 0
	@observable group1Options=[]
	@observable group2Options=[]
	@observable group3Options=[]
	@computed
	get group1(){
		return this.group1Options
	}
	@computed
	get group2(){
		return this.group2Options.filter(item => item.group1Id === this.group1Id)
	}
	@computed
	get group3(){
		return this.group3Options.filter(item => item.group2Id === this.group2Id)
	}
	@action.bound
	async getRecommendMusic(){
		let recommendMusic = await getRecommendMusic()
		this.recommendMusic = recommendMusic.data
	}

	@action.bound
	async collectMusicById(id) {
		let data = await collectMusicById({id})
	}
	@action.bound
	async getGroupMusic(id) {
		let {data} = await getGroupMusic({id})
		this.group1Options = data.group1
		this.group2Options = data.group2
		this.group3Options = data.group3
		this.group1Id = data.group1[0].id
		this.group2Id = data.group2[0].id
	}
}

const music = new Music()

export default music
