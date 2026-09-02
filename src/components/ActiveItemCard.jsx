import { useEffect, useState } from 'react'
import shared from '../styles/shared.module.css'
import styles from './ActiveItemCard.module.css'

export default function ActiveItemCard({ guitars, selectedId }) {
  const [activeItem, setActiveItem] = useState(null)

  useEffect(() => {
    if (selectedId == null) {
      setActiveItem(null)
      return
    }

    const found = guitars.find((g) => g.id === selectedId)
    setActiveItem(found)
  }, [selectedId, guitars])

  return (
    <div className={`${shared.card} ${styles.detailCard}`}>
      <h2 className={shared.cardTitle}>Active Item Profile</h2>

      {!activeItem && (
        <p className={styles.detailEmpty}>Select a row in the Registry Table to view its full profile.</p>
      )}

      {activeItem && (
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
              <span className={`${shared.badge} ${activeItem.userRole === 'Merchant' ? shared.badgeMerchant : shared.badgeConsumer}`}>
                {activeItem.userRole}
              </span>
            </dd>
          </div>
        </dl>
      )}
    </div>
  )
}
