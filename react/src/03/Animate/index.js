import React from 'react';
import ReactDOM from 'react-dom';
import 'animate.css';

class Animate extends React.Component {
  remove = () => {
    let dom = ReactDOM.findDOMNode(this)
    dom.classList.add('animated', this.props.out)
    setTimeout(() => {
      dom.style.display = 'none'
    }, 500)
  }
  render() {
    let {
      render
    } = this.props
    return(
      <div>
        {render(this.remove)}
      </div>
    )
  }
  componentDidMount() {
    const dom = ReactDOM.findDOMNode(this)
    dom.classList.add('animated', this.props.in)
  }
}

export default Animate