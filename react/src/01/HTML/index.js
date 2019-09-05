import React from 'react'

const HT = () => {
  let name = 'demo list'
  let nodes = ['a', 'b', 'c', 'd'].map(item => {
    return <p key={item} style={{color:'red'}}>{item}</p>
  })
  return (
    <div>
      {name}
      {nodes}
    </div>
  )
}

export default HT