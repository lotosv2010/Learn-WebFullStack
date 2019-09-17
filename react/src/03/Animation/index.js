import React from 'react';
import { AnimationItem, AnimationList } from './list'

class Animation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g'
      ],
      value: ''
    }
  }
  render() {
    const {
      list,
      value
    } = this.state

    return(
      <div>
        <input value={value} onChange={e => this.setState({value: e.target.value})}/>
        <button onClick={e => {
          list.push(value)
          this.setState({
            list
          })
        }}>add</button>
        <AnimationList
          delayTime='0.2'
          runTime='0.2'
          mountStyle={{
            marginLeft: '15px'
          }}
          unMountStyle={{
            marginLeft: 0
          }}
          remove={(index) => {
            list.splice(index, 1)
            this.setState({
              list
            })
          }}
        >
          {
            this.state.list.map((item, index) => <AnimationItem index={index + 1} key={item} render={(remove) => (
              <p>
                Hello {item} <button
                  onClick={
                    e => {
                      remove(index)
                    }
                  }
                >delete</button>
              </p>
            )}>
            </AnimationItem>)
          }
        </AnimationList>
      </div>
    )
  }
}

export default Animation