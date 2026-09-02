import { useEffect, useState } from 'react'
import GuitarForm from './components/GuitarForm'
import RegistryTable from './components/RegistryTable'
import ActiveItemCard from './components/ActiveItemCard'
import styles from './App.module.css'

const STORAGE_KEY = 'guitar-store-registry-v2'

function loadInitialGuitars() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

function App() {
  const [guitars, setGuitars] = useState(loadInitialGuitars)
  const [view, setView] = useState('form')
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guitars))
  }, [guitars])

  function handleRegister(values) {
    const newGuitar = { id: guitars.length + 1, ...values }
    setGuitars([...guitars, newGuitar])
    setView('registry')
  }

  return (
    <div className={styles.appShell}>
      <header className={styles.appHeader}>
        <h1>Guitar Store Inventory Manager</h1>
      </header>

      <nav className={styles.appTabs}>
        <button
          type="button"
          className={`${styles.tabBtn} ${view === 'form' ? styles.tabActive : ''}`}
          onClick={() => setView('form')}
        >
          1. Register Item
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${view === 'registry' ? styles.tabActive : ''}`}
          onClick={() => setView('registry')}
        >
          2. Registry Table
        </button>
      </nav>

      <main>
        {view === 'form' && <GuitarForm onSubmit={handleRegister} />}

        {view === 'registry' && (
          <div className={styles.registryLayout}>
            <RegistryTable
              guitars={guitars}
              selectedId={selectedId}
              onSelectRow={setSelectedId}
            />
            <ActiveItemCard guitars={guitars} selectedId={selectedId} />
          </div>
        )}
      </main>
    </div>
  )
}

export default App
