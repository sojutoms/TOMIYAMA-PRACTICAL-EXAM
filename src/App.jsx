import { useState } from 'react'
import GuitarForm from './components/GuitarForm'
import styles from './App.module.css'

function App() {
  const [guitars, setGuitars] = useState([])

  function handleRegister(values) {
    setGuitars((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((g) => g.id)) + 1 : 1
      return [...prev, { id: nextId, ...values }]
    })
  }

  return (
    <div className={styles.appShell}>
      <header className={styles.appHeader}>
        <h1>Guitar Store Inventory Manager</h1>
      </header>

      <main>
        <GuitarForm onSubmit={handleRegister} />
      </main>
    </div>
  )
}

export default App
