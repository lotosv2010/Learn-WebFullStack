import React from 'react';
import Provider from './Provider/';
import BaseUser from './User/';
import BasePost from './Post/';

const connect = (Com) => {
  // Com.contextTypes = types
  // debugger
  class ConnectComponent extends React.Component {
    static contextTypes = Provider.childContextTypes
    displayName = Com.displayName
    render() { 
      return (
        <Com {...this.context}/>
      );
    }
  }
  return ConnectComponent
}

const User = connect(BaseUser);
const Post = connect(BasePost);
const store = {
  name: 'ryan',
  age: 18
}

class HighComponent extends React.Component {
  state = {  }
  render() { 
    return (
      <Provider store={store}>
        <div>
          <User />
          <Post />
        </div>
      </Provider>
    );
  }
}
export default HighComponent;