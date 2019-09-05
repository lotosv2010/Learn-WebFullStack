import React from 'react';
// import PropTypes from 'prop-types';

class Post extends React.Component {
  // static contextTypes = {
  //   age: PropTypes.number
  // }
  render() { 
    return (
      <div>
        {this.props.age}
      </div>
    );
  }
}

export default Post;