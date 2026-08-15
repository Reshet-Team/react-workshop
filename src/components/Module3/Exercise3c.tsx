import { useState, useEffect } from 'react'
import styles from './Module3.module.css'

export function Exercise3c() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const [keyLog, setKeyLog] = useState<string[]>([])
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    if (!isListening) return

    const handleResize = (): void => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }

    const handleKeydown = (e: KeyboardEvent): void => {
      setKeyLog((prev) => [...prev.slice(-9), e.key])
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('keydown', handleKeydown)
  }, [isListening])

  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Keyboard & Resize Listener</div>
        <p className={styles.hint}>
          Toggle listening on and off a few times, then press keys — notice duplicate entries
          appearing for each keypress.
        </p>

        <div className={styles.resizeDisplay}>
          {dimensions.width} × {dimensions.height}
        </div>

        <div className={styles.actions}>
          <button
            className={`${styles.btn} ${isListening ? styles.btnDanger : styles.btnPrimary}`}
            onClick={() => setIsListening((prev) => !prev)}
          >
            {isListening ? 'Stop Listening' : 'Start Listening'}
          </button>
        </div>

        {keyLog.length > 0 && (
          <ul className={styles.log} style={{ marginTop: '1rem' }}>
            {keyLog.map((entry, i) => (
              <li key={i} className={styles.logItem}>
                {entry}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
