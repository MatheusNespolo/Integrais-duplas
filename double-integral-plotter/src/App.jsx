import { useState } from 'react'
import Plotly from 'plotly.js-dist'
import { evaluate } from 'mathjs'
import './App.css'

export default function App() {
  const [func, setFunc] = useState('log(x*x) + log(y*y)')
  const [xMin, setXMin] = useState(-10)
  const [xMax, setXMax] = useState(10)
  const [yMin, setYMin] = useState(-10)
  const [yMax, setYMax] = useState(10)

  const plot = () => {
    const xVals = numericRange(xMin, xMax, 40)
    const yVals = numericRange(yMin, yMax, 40)
    const z = yVals.map(y =>
      xVals.map(x => {
        try {
          return evaluate(func, { x, y })
        } catch {
          return NaN
        }
      })
    )

    const surface = {
      type: 'surface',
      x: xVals,
      y: yVals,
      z: z,
      opacity: 0.9,
      colorscale: 'Viridis',
    }

    const layout = {
      title: `Gráfico de f(x,y) = ${func}`,
      scene: {
        xaxis: { title: 'x' },
        yaxis: { title: 'y' },
        zaxis: { title: 'z' },
      },
    }

    Plotly.newPlot('plot', [surface], layout)
  }

  return (
    <div className="container">
      <h1>Nesplot</h1>
      <input value={func} onChange={e => setFunc(e.target.value)} placeholder="f(x,y)" />
      <div className="inputs">
        <label>x: <input type="number" value={xMin} onChange={e => setXMin(+e.target.value)} /></label>
        <label>x: <input type="number" value={xMax} onChange={e => setXMax(+e.target.value)} /></label>
        <label>y: <input type="number" value={yMin} onChange={e => setYMin(+e.target.value)} /></label>
        <label>y: <input type="number" value={yMax} onChange={e => setYMax(+e.target.value)} /></label>
      </div>
      <button onClick={plot}>Gerar Gráfico</button>
      <div id="plot" style={{ width: '100%', height: '600px' }}></div>
    </div>
  )
}

function numericRange(start, end, steps) {
  const arr = []
  const step = (end - start) / (steps - 1)
  for (let i = 0; i < steps; i++) arr.push(start + i * step)
  return arr
}
