import { useState, useRef, useEffect } from 'react'
import styles from './Module5.module.css'

export function Solution5c() {
  const [count, setCount] = useState(0)
  const previousRef = useRef(0)
  const [previous, setPrevious] = useState(0)

  useEffect(() => {
    setPrevious(previousRef.current)
    previousRef.current = count
  }, [count])

  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Previous Value Tracker</div>
        <div className={styles.renderDisplay}>Current: {count}</div>
        <div className={styles.output}>Previous: {previous}</div>
        <div className={styles.actions} style={{ marginTop: '1rem' }}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => setCount((c) => c + 1)}
          >
            Increment
          </button>
          <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => setCount(0)}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
