import { useState, useRef, useEffect } from 'react'
import styles from './Module5.module.css'

function Stopwatch({ label }: { label: string }) {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleStart = (): void => {
    if (running) return
    setRunning(true)
    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1)
    }, 100)
  }

  const handlePause = (): void => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setRunning(false)
  }

  const handleReset = (): void => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setRunning(false)
    setElapsed(0)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

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

export function Solution5b() {
  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Stopwatch</div>
        <div className={styles.stopwatchRow}>
          <Stopwatch label='Timer A' />
          <Stopwatch label='Timer B' />
        </div>
      </div>
    </div>
  )
}
