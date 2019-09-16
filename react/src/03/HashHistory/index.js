import React from 'react';
import PropTypes from 'prop-types';


class Router extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hash: window.location.hash
    }
  }

  static childContextTypes = {
    hash: PropTypes.string
  }

  getHash() {
    let url = window.location.hash.replace('#', '')
    return url
  }

  getChildContext() {
    return {
      hash: this.getHash()
    }
  }

  componentDidMount() {
    window.onhashchange = () => {
      this.setState({
        hash: this.getHash()
      })
    }
  }

  render() {
    return (
      <>
        {this.props.children}
      </>
    )
  }
}

class Route extends React.Component {

  static contextTypes = {
    hash: PropTypes.string
  }

  render() {
    const {
      path,
      component
    } = this.props

    let instance = null
    const {
      hash
    } = this.context
    if (path === hash) {
      instance = React.createElement(component, null, null)
    }
    return (
      <>
        {instance}
      </>
    )
  }
}

const AA = () => <div>aa</div>
const BB = () => <div>bb</div>

function HashHistoryDemo() {
  return(
    <div>
      <Router>
        <header>
          <div>header</div>
          <Route path="/aa" component={AA} />
          <Route path="/bb" component={BB} />
        </header>
      </Router>
    </div>
  )
}
export default HashHistoryDemo