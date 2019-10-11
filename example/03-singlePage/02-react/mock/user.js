export default {
	"/user/getUserDetail" : (req, res) => {
		setTimeout(() => {
			res.send({
				status: 200,
				message: 'success',
				data:{
					name: 'ryan',
					age: 30,
					country: 'cn'
				}
			})
		}, 1000)
	}
}
