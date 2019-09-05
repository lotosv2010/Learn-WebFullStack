import React from 'react';

const loading = Com => {
  class loadingComponent extends Com {
    // render() { 
    //   return (
    //     <div>
    //       loading
    //       {super.render()}
    //     </div>
    //   );
    // }

    showLoading() {
      console.log('show')
    }
    hideLoading() {
      console.log('hide')
    }
  }
  return loadingComponent
}

@loading
class User extends React.Component {
  render() { 
    return (
      <div>User</div>
    );
  }

  componentDidMount() {
    this.showLoading()
    setTimeout(() => {
      this.hideLoading()
    }, 2000)
  }
}


class Loading extends React.Component {
  render() { 
    return (
      <User />
    );
  }
}
export default Loading;
