export default {
	"/music/getRecommendMusic" : (req, res) => {
		setTimeout(() => {
			res.send({
				status: 200,
				message: 'success',
				data:{
					name: 'Electro Blues for Bukka White',
					author: 'Recoil',
					background: 'https://p1.music.126.net/jJvI8mHDBYOZImfhBOfRVQ==/109951163631692376.jpg?param=400y400',
					type: '电子音乐',
					alias: 'Electronics',
					audio: 'http://m7.music.126.net/20190901013155/5ef9b09c9aa02b5e7c1916592989df85/yyaac/045a/005c/035d/304d9fdd7876033ad72f479b7797aea8.m4a#t=123',
					last: 135,
					id: 9527
				}
			})
		}, 1000)
	},
	"/music/collectMusicById" : (req, res) => {
		setTimeout(() => {
			res.send({
				status: 200,
				message: 'success',
				data:''
			})
		}, 1000)
	},
	"/music/getGroupMusic": (req,res) => {
		res.send({
			status: 200,
			message: 'success',
			data:{
				group1 : [
					{
						name:'电音',
						id:1
					},
					{
						name: '爵士',
						id:2
					},
					{
						name:'古典',
						id:3
					}
				],
				group2 : [
					{
						name:'最新电音',
						group1Id: 1,
						id:1
					},
					{
						name:'氛围',
						group1Id: 1,
						id:2
					},
					{
						name:'作曲家',
						group1Id: 2,
						id:3
					},
					{
						name:'时代',
						group1Id: 2,
						id:4
					}
				],
				group3: [
					{
						name:'a',
						group2Id:1
					},
					{
						name:'aa',
						group2Id:1
					},
					{
						name:'告白气球',
						group2Id:1
					},
					{
						name:'b',
						group2Id:2
					},
					{
						name:'bb',
						group2Id:2
					},
					{
						name:'c',
						group2Id:3
					},
					{
						name:'cc',
						group2Id:3
					},
					{
						name:'d',
						group2Id:4
					},
					{
						name:'dd',
						group2Id:4
					}
				]
			}
		})
	}
}
