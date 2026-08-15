import { useState } from 'react'
import styles from './Module1.module.css'

interface UserData {
  name: string
  email: string
}

function sendAnalytics(data: UserData): string {
  return `Analytics sent → name: "${data.name}", email: "${data.email}"`
}

export function Solution1b() {
  const [userData, setUserData] = useState<UserData>({ name: '', email: '' })
  const [analyticsLog, setAnalyticsLog] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [emailInput, setEmailInput] = useState('')

  const handleSubmit = (): void => {
    // FIX: Build the payload first, then use the local variable for both operations
    const newData: UserData = { name: nameInput, email: emailInput }
    setUserData(newData)
    const log = sendAnalytics(newData)
    setAnalyticsLog(log)
  }

  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Registration Form</div>
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
          <button className={`${styles.btn} ${styles.btnSuccess}`} onClick={handleSubmit}>
            Submit & Log Analytics
          </button>
        </div>
      </div>

      {analyticsLog && (
        <div className={styles.card}>
          <div className={styles.label}>Analytics Payload</div>
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
