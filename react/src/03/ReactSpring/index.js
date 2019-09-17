import React, {Component,useState, useEffect} from 'react';
import {useSprings, useTrail, animated} from 'react-spring'

/*
function ReactSpring() {
  const props = useSpring({ number: 1, from: { number: 0 } })
  return <animated.h2>{props.number}</animated.h2>
}


function ReactSpring() {
  const props = useSpring({
    to: async (next, cancel) => {
      await next({opacity: 1, color: '#ffaaaa'})
      await next({opacity: 0.5, color: 'rgb(14,26,19)'})
      await next({marginLeft: 500, color: 'rgb(14,26,19)'})
    },
    from: {opacity: 0, color: 'red', marginLeft: 0}
  })
  return <animated.div style={props}>hello world</animated.div>
}


function ReactSpring() {
  const props = useSpring({
    to: [{opacity: 1, color: '#ffaaee'}, {opacity: 0, color: 'rgb(14,26,19)'}],
    from: {opacity: 0, color: 'red'}
  })
  return <animated.div style={props}>hello world</animated.div>
}

const items = ['Lorem', 'ipsum', 'dolor', 'sit']
function ReactSpring() {
  const [trail, set, stop] = useTrail(items.length, () => ({
    opacity: 1,
    height: 80,
    from: {opacity: 0, height: 0}
  }))
  return(
    <div className="trails-main">
      <div>
        {
          trail.map((style, index) => (
            <animated.div
              key={items[index]}
              className='trails-text'
              style={style}
            >
              <p>
                {items[index]}<button onClick={e => {
                  set({
                    opacity: 0,
                    height: 0
                  })
                }}>delete</button>
              </p>
            </animated.div>
          ))
        }
      </div>
    </div>
  )
}
*/

function ReactSpring() {
  // const [toggle, setToggle] = useState(true)
  const [springs, set, stop] = useSprings(4, index => {
    return {
      opacity: 0,
      height:0
    }
  })

  useEffect(() => {
    set(index => {
      return {
        opacity: 1,
        height:80
      }
    })
  })

  return (
    <div className="trails-main">
      <div>
        {
          springs.map((style,index) => (
            <animated.div
              key={index}
              className="trails-text"
              style={style}
              onClick={e => {
                set(i => {
                  if (index === i) {
                    return {
                      opacity: 0,
                      height:0
                    }
                  }
                  return {
                    opacity: 1,
                    height:80
                  }
                })
              }}
            >
              hello {index}
            </animated.div>
          ))
        }
      </div>
    </div>
  )
}

export default ReactSpring
