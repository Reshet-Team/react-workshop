import { useState } from 'react'
import styles from './Module1.module.css'

interface UserData {
  name: string
  email: string
}

// Simulated analytics function
function sendAnalytics(data: UserData): string {
  return `Analytics sent → name: "${data.name}", email: "${data.email}"`
}

export function Exercise1b() {
  const [userData, setUserData] = useState<UserData>({ name: '', email: '' })
  const [analyticsLog, setAnalyticsLog] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [emailInput, setEmailInput] = useState('')

  const handleSubmit = (): void => {
    setUserData({ name: nameInput, email: emailInput })
    const log = sendAnalytics(userData)
    setAnalyticsLog(log)
  }

  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Registration Form</div>
        <p className={styles.hint}>
          Submit the form and check the analytics payload — it always sends the previous data, not
          what you just typed.
        </p>
        <div className={styles.row}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Name</span>
            <input
              className={styles.input}
              type='text'
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder='Jane Doe'
            />
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Email</span>
            <input
              className={styles.input}
              type='text'
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder='jane@example.com'
            />
          </div>
        </div>
        <div className={styles.actions} style={{ marginTop: '1rem' }}>
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSubmit}>
            Submit & Log Analytics
          </button>
        </div>
      </div>

      {analyticsLog && (
        <div className={styles.card}>
          <div className={styles.label}>Analytics Payload (stale!)</div>
          <div className={styles.output}>{analyticsLog}</div>
        </div>
      )}

      <div className={styles.card}>
        <div className={styles.label}>Current State</div>
        <div className={styles.output}>{JSON.stringify(userData, null, 2)}</div>
      </div>
    </div>
  )
}
