import { useState } from 'react'
import styles from './Module5.module.css'

let timerId: ReturnType<typeof setInterval> | null = null

function Stopwatch({ label }: { label: string }) {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)

  const handleStart = (): void => {
    if (running) return
    setRunning(true)
    timerId = setInterval(() => {
      setElapsed((prev) => prev + 1)
    }, 100)
  }

  const handlePause = (): void => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    }
    setRunning(false)
  }

  const handleReset = (): void => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    }
    setRunning(false)
    setElapsed(0)
  }

  const seconds = (elapsed / 10).toFixed(1)

  return (
    <div className={styles.stopwatch}>
      <div className={styles.label}>{label}</div>
      <div className={styles.stopwatchTime}>{seconds}s</div>
      <div className={styles.stopwatchRow}>
        <button className={`${styles.btn} ${styles.btnSuccess}`} onClick={handleStart}>
          Start
        </button>
        <button className={styles.btn} onClick={handlePause}>
          Pause
        </button>
        <button className={`${styles.btn} ${styles.btnDanger}`} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  )
}

export function Exercise5b() {
  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Stopwatch</div>
        <p className={styles.hint}>
          Start both stopwatches, then try pausing just one — they share a module-level timerId, so
          pausing one breaks the other.
        </p>
        <div className={styles.stopwatchRow}>
          <Stopwatch label='Timer A' />
          <Stopwatch label='Timer B' />
        </div>
      </div>
    </div>
  )
}
