import { useEffect, useState } from 'react'
import GuitarForm from './components/GuitarForm'
import RegistryTable from './components/RegistryTable'
import ActiveItemCard from './components/ActiveItemCard'
import styles from './App.module.css'

const BODY_TYPES = ['Electric', 'Acoustic', 'Bass', 'Classical']
const USER_ROLES = ['Merchant', 'Consumer']
const STORAGE_KEY = 'guitar-store-registry-v2'

function normalizeGuitar(guitar) {
  return {
    ...guitar,
    bodyType: BODY_TYPES.includes(guitar.bodyType) ? guitar.bodyType : BODY_TYPES[0],
    userRole: USER_ROLES.includes(guitar.userRole) ? guitar.userRole : USER_ROLES[0],
  }
}

function loadInitialGuitars() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : []
    return Array.isArray(parsed) ? parsed.map(normalizeGuitar) : []
  } catch {
    return []
  }
}

function App() {
  const [guitars, setGuitars] = useState(loadInitialGuitars)
  const [view, setView] = useState('form')
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guitars))
  }, [guitars])

  function handleRegister(values) {
    setGuitars((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((g) => g.id)) + 1 : 1
      return [...prev, { id: nextId, ...values }]
    })
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
