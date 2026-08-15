import { useState, useEffect } from 'react'
import styles from './Module3.module.css'

export function Exercise3a() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [isStepOneSubmitted, setIsStepOneSubmitted] = useState(false)
  const [validationError, setValidationError] = useState('')
  const [log, setLog] = useState<string[]>([])

  const addLog = (msg: string): void => {
    setLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`])
  }

  useEffect(() => {
    if (isStepOneSubmitted) {
      addLog('Effect fired: isStepOneSubmitted changed')
      if (!name.trim() || !email.trim()) {
        setValidationError('Name and email are required')
        setIsStepOneSubmitted(false)
        return
      }
      setValidationError('')
      setCurrentStep(2)
      addLog('Advancing to step 2')
    }
  }, [isStepOneSubmitted, name, email])

  useEffect(() => {
    if (currentStep === 2) {
      addLog('Effect fired: step changed to 2, sending data...')
      setTimeout(() => {
        addLog('API response received')
      }, 500)
    }
  }, [currentStep])

  const handleSubmitStep1 = (): void => {
    addLog('Button clicked: Submit Step 1')
    setIsStepOneSubmitted(true)
  }

  const handleReset = (): void => {
    setName('')
    setEmail('')
    setCurrentStep(1)
    setIsStepOneSubmitted(false)
    setValidationError('')
    setLog([])
  }

  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Multi-Step Checkout</div>
        <p className={styles.hint}>
          Click "Submit Step 1" and watch the effect log — cascading effects fire on mount and cause
          unnecessary renders.
        </p>

        <div className={styles.stepIndicator}>
          <span
            className={`${styles.step} ${currentStep >= 1 ? styles.stepActive : ''} ${currentStep > 1 ? styles.stepDone : ''}`}
          >
            Step 1
          </span>
          <span className={`${styles.step} ${currentStep >= 2 ? styles.stepActive : ''}`}>
            Step 2
          </span>
        </div>

        {currentStep === 1 && (
          <div className={styles.row}>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Name</span>
              <input
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Jane Doe'
              />
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Email</span>
              <input
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='jane@example.com'
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className={styles.output}>
            Order confirmed for {name} ({email})
          </div>
        )}

        {validationError && (
          <div className={styles.output} style={{ color: '#fca5a5', borderColor: '#7f1d1d' }}>
            {validationError}
          </div>
        )}

        <div className={styles.actions} style={{ marginTop: '1rem' }}>
          {currentStep === 1 && (
            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSubmitStep1}>
              Submit Step 1
            </button>
          )}
          <button className={`${styles.btn} ${styles.btnDanger}`} onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.label}>Effect Log</div>
        <ul className={styles.log}>
          {log.map((entry, i) => (
            <li key={i} className={styles.logItem}>
              {entry}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
