import React from 'react';
import { connect } from 'react-redux';

import { updateTitle } from '../actions/title';
import * as style from './index.scss';

import logo from '../../logo.svg';


class Home extends React.Component {
  render() {
    return(
      <div className={style.wrap}>
        <img className={style.log} src={logo}  alt="logo" />
        <h2 onClick={() => updateTitle('hello world!')} className={style.title}>{this.props.title}</h2>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    title: state.title
  }
})(Home)