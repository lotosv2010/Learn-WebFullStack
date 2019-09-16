import React from 'react';
import PropTypes from 'prop-types';


class Router extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hash: this.getPath()
    }
    this.history = window.history
  }

  static childContextTypes = {
    hash: PropTypes.string
  }

  getPath() {
    let url = window.location.pathname
    return url
  }

  getChildContext() {
    return {
      hash: this.state.hash
    }
  }

  componentDidMount() {
    this.history.route = (name) => {
      this.setState({
        hash: `/${name}`
      })
      window.history.pushState(null, null, name)
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

function BrowserHistoryDemo() {
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
export default BrowserHistoryDemo