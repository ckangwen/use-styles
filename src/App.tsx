import React, { useState } from 'react'
import createUseStyle from './core';

const App: React.FC = () => {
  const useStyle = createUseStyle({
    btn: {
      color: ({ color }) => color,
      fontWeight: 'bold',
      border: ({ color }) => `1px solid ${color}`,
    },
  }, {
    key: 'btn',
  })
  const [color, setColor] = useState('green')
  const classes = useStyle({ color })
  return (
    <div>
      <h1 className={classes.btn}>Good</h1>
      <button type="button" onClick={ () => setColor('red') }>red</button>
      <button type="button" onClick={ () => setColor('black') }>black</button>
    </div>
   )
}

export default App
