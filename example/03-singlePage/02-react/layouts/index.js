import {
	Component
} from 'react'
import {
	observable
} from 'mobx'
import {
	observer,
	inject,
	Provider
} from 'mobx-react'

import store from '../store'
window.store = store
class Init extends Component{
	render() {
		return (
			<div>
				<img width='100%' height='100%' src='https://s5.music.126.net/static_public/5bd00c583b8aa5c30ebf4586_5bd00c6f3b8aa5c30ebf458b/7535b6c449dfe20ab66c0113553ceebc.jpg'/>
			</div>
		);
	}
}

@observer
class Layout extends Component{
	@observable isLoading = true
	render() {
		return (
			<Provider {...store}>
				{ this.isLoading ? <Init/>: this.props.children}
			</Provider>
		);
	}

	async componentDidMount() {
		const {
			user
		} = this.props
		this.isLoading = true
		await store.user.fetch()
		this.isLoading = false
	}
}
export default Layout
