import React, { useState, useEffect } from 'react';

const Hooks = (props) => {
  let [time, setTime] = useState(0); // useState(0)传入初始状态
  let [age, setAge] = useState(10);

  // useEffect 会将 componentDidMount 和 componentDidUpdate 合并,传入第二个参数阻止合并
  useEffect(() => {
    console.log('useEffect')
    return () => {
      console.log('nunMount')
    }
  }, [age])

  return (
    <div>
      <p>Hello World</p>
      <p>{props.name}</p>
      <p>{time}<button onClick={e => setTime(++time)}>Add Time</button></p>
      <p>{age}<button onClick={e => setAge(++age)}>Add Age</button></p>
    </div>
  )
}

export default Hooks;