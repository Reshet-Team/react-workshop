import { useState } from 'react'
import styles from './Module1.module.css'

export function Exercise1a() {
  const [quantity, setQuantity] = useState(0)

  const handleQuickAdd = (): void => {
    setQuantity(quantity + 1)
    setQuantity(quantity + 1)
    setQuantity(quantity + 1)
  }

  const handleAlertAfterDelay = (): void => {
    setTimeout(() => {
      alert(`Quantity is: ${quantity}`)
    }, 3000)
  }

  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Cart Quantity</div>
        <p className={styles.hint}>
          "Quick Add (+3)" should add 3 to the quantity, but only adds 1. The delayed alert shows a
          stale number if you click +1 during the wait.
        </p>
        <div className={styles.value}>{quantity}</div>
        <div className={styles.actions}>
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleQuickAdd}>
            Quick Add (+3)
          </button>
          <button className={styles.btn} onClick={() => setQuantity(quantity + 1)}>
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
