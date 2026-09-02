import { useEffect, useState } from 'react'
import shared from '../styles/shared.module.css'
import styles from './ActiveItemCard.module.css'

export default function ActiveItemCard({ guitars, selectedId }) {
  const [activeItem, setActiveItem] = useState(null)
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    if (selectedId == null) {
      setActiveItem(null)
      return
    }

    setIsSyncing(true)
    const timer = setTimeout(() => {
      const found = guitars.find((g) => g.id === selectedId) ?? null
      setActiveItem(found)
      setIsSyncing(false)
    }, 150)

    return () => clearTimeout(timer)
  }, [selectedId, guitars])

  const role = activeItem?.userRole ?? 'Unknown'
  const badgeClass = shared[`badge${role}`] ?? shared.badgeUnknown

  return (
    <div className={`${shared.card} ${styles.detailCard}`}>
      <h2 className={shared.cardTitle}>Active Item Profile</h2>

      {!selectedId && (
        <p className={styles.detailEmpty}>Select a row in the Registry Table to view its full profile.</p>
      )}

      {selectedId && isSyncing && (
        <p className={styles.detailEmpty}>Syncing selection&hellip;</p>
      )}

      {selectedId && !isSyncing && activeItem && (
        <dl className={styles.detailList}>
          <div className={styles.detailRow}>
            <dt>Item Name</dt>
            <dd>{activeItem.model}</dd>
          </div>
          <div className={styles.detailRow}>
            <dt>Sub-category</dt>
            <dd>{activeItem.bodyType}</dd>
          </div>
          <div className={styles.detailRow}>
            <dt>Brand/Artist</dt>
            <dd>{activeItem.brand}</dd>
          </div>
          <div className={styles.detailRow}>
            <dt>Stock/Health Rating</dt>
            <dd>{activeItem.stock} / 100</dd>
          </div>
          <div className={styles.detailRow}>
            <dt>Label/Company</dt>
            <dd>{activeItem.manufacturer}</dd>
          </div>
          <div className={styles.detailRow}>
            <dt>User Role</dt>
            <dd>
              <span className={`${shared.badge} ${badgeClass}`}>{role}</span>
            </dd>
          </div>
        </dl>
      )}
    </div>
  )
}
