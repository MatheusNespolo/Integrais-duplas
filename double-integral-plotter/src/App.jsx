import { useState, useEffect } from 'react'
import Plotly from 'plotly.js-dist'
import { evaluate } from 'mathjs'
import './App.css'

export default function App() {
  const [func, setFunc] = useState('log(x*x) + log(y*y)')
  const xMin = -10
  const xMax = 10
  const yMin = -10
  const yMax = 10

  useEffect(() => {
    plot()
  }, [])
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

    Plotly.newPlot('plot', [surface],
      {layout,
        autosize: true,
        width: '80%',
        margin: {t: 40, l: 40, r: 40, b: 40},
      }).then(() => {
      window.addEventListener('resize', () => {
        Plotly.Plots.resize(document.getElementById('plot'));
      });
    });
  }

  return (
    <div className="container">
      <h1>Nesplot</h1>
      <input
        value={func}
        onChange={e => setFunc(e.target.value)}
        placeholder="f(x,y)"
      />
      <button onClick={plot}>Gerar Gráfico</button>
      <div id="plot" style={{ width: '100%', height: '600px', marginTop: '2rem' }}></div>
    </div>
  )
}

function numericRange(start, end, steps) {
  const arr = []
  const step = (end - start) / (steps - 1)
  for (let i = 0; i < steps; i++) arr.push(start + i * step)
  return arr
}
