import React from 'react';
// import PropTypes from 'prop-types';

class User extends React.Component {
  // static contextTypes = {
  //   name: PropTypes.string
  // }
  render() {
    return (
      <div>
        {this.props.name}
      </div>
    );
  }
}

export default User;