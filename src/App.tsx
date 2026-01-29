import { Board } from './components'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>无名当铺</h1>
        <p className="subtitle">第八号当铺</p>
      </header>
      
      <main className="app-main">
        <Board width={6} height={8} />
      </main>
      
      <footer className="app-footer">
        <p>「任何的换取都是有代价的」</p>
      </footer>
    </div>
  )
}

export default App
