import {
  Component
} from 'react'
import styles from './index.css';
import {observer,inject} from "mobx-react";
import {observable} from 'mobx'
import Player from '../components/player'
import i18n from '../i18n'
import M1 from "../assets/m1.mp3";
import Channel from '../components/channel'
@inject('music')
@observer
class PageIndex extends Component{
	@observable showChannel = true
	render() {
		const {
			music
		} = this.props
		return (
			<div className={styles.page}>
				<div className={styles.header}>
					<a/>
					<div className={styles["header--info"]}>
						<p>{music.recommendMusic.name}</p>
						<p>{music.recommendMusic.author}</p>
					</div>
					<a className={styles["header--share"]}/>
				</div>
				<div className={styles.content}>
					<img src={music.recommendMusic.background}/>
				</div>
				<div className={styles.desc}>
					<p>{music.recommendMusic.type}</p>
					<p>{music.recommendMusic.alias}</p>
				</div>
				<Player item={music.recommendMusic}/>
				{this.showChannel && <Channel data={music.classify} onHide={e => {
				this.showChannel = false
				}}/>}
			</div>
		);
	}

	componentDidMount() {
		const {
			music
		} = this.props
		music.getRecommendMusic()
		music.getGroupMusic()
	}

}

export default PageIndex
