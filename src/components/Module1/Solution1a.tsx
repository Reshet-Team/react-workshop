import { useState } from 'react'
import styles from './Module1.module.css'

export function Solution1a() {
  const [quantity, setQuantity] = useState(0)

  const handleQuickAdd = (): void => {
    // FIX: Updater functions chain from the pending state
    setQuantity((prev) => prev + 1)
    setQuantity((prev) => prev + 1)
    setQuantity((prev) => prev + 1)
  }

  const handleAlertAfterDelay = (): void => {
    // The alert still captures the snapshot — this is expected behavior.
    // The closure captures `quantity` at this render pass.
    setTimeout(() => {
      alert(`Quantity is: ${quantity}`)
    }, 3000)
  }

  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Cart Quantity</div>
        <div className={styles.value}>{quantity}</div>
        <div className={styles.actions}>
          <button className={`${styles.btn} ${styles.btnSuccess}`} onClick={handleQuickAdd}>
            Quick Add (+3)
          </button>
          <button className={styles.btn} onClick={() => setQuantity((prev) => prev + 1)}>
            +1
          </button>
          <button className={`${styles.btn} ${styles.btnWarn}`} onClick={handleAlertAfterDelay}>
            Alert after 3s
          </button>
          <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => setQuantity(0)}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
