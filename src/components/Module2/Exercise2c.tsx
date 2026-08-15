import { useState } from 'react'
import styles from './Module2.module.css'

interface Email {
  id: string
  from: string
  subject: string
  body: string
  read: boolean
  starred: boolean
}

const INITIAL_EMAILS: Email[] = [
  {
    id: 'a',
    from: 'team@react.dev',
    subject: 'React 19 Released',
    body: 'We are excited to announce React 19 with new features including Actions, use(), and more.',
    read: false,
    starred: false,
  },
  {
    id: 'b',
    from: 'hr@company.com',
    subject: 'Q3 Performance Review',
    body: 'Please complete your self-assessment by end of week. Your manager will follow up.',
    read: false,
    starred: true,
  },
  {
    id: 'c',
    from: 'noreply@github.com',
    subject: 'PR #247 merged',
    body: 'Your pull request "Fix batching in StrictMode" has been merged into main.',
    read: true,
    starred: false,
  },
  {
    id: 'd',
    from: 'events@meetup.com',
    subject: 'React Meetup Tomorrow',
    body: 'Reminder: the local React meetup is happening tomorrow at 6pm. See you there!',
    read: false,
    starred: false,
  },
]

export function Exercise2c() {
  const [emails, setEmails] = useState<Email[]>(INITIAL_EMAILS)
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)

  const handleSelect = (email: Email): void => {
    setSelectedEmail(email)
  }

  const handleToggleRead = (id: string): void => {
    setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, read: !e.read } : e)))
  }

  const handleToggleStar = (id: string): void => {
    setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, starred: !e.starred } : e)))
  }

  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Inbox</div>
        <p className={styles.hint}>
          Select an email, then toggle its read/starred status — the list updates but the preview
          panel stays stale.
        </p>
        <div className={styles.sidebar}>
          <ul className={styles.emailList}>
            {emails.map((email) => (
              <li
                key={email.id}
                className={`${styles.emailItem} ${selectedEmail?.id === email.id ? styles.emailItemActive : ''}`}
                onClick={() => handleSelect(email)}
              >
                <div className={styles.emailSubject}>
                  {email.subject}
                  {!email.read && (
                    <span className={`${styles.badge} ${styles.badgeUnread}`}>new</span>
                  )}
                  {email.starred && (
                    <span className={`${styles.badge} ${styles.badgeStarred}`}>★</span>
                  )}
                </div>
                <div className={styles.emailMeta}>{email.from}</div>
              </li>
            ))}
          </ul>

          {selectedEmail ? (
            <div className={styles.emailPreview}>
              <div className={styles.emailPreviewTitle}>{selectedEmail.subject}</div>
              <div className={styles.emailMeta} style={{ marginBottom: '0.75rem' }}>
                From: {selectedEmail.from}
                {!selectedEmail.read && (
                  <span className={`${styles.badge} ${styles.badgeUnread}`}>unread</span>
                )}
                {selectedEmail.starred && (
                  <span className={`${styles.badge} ${styles.badgeStarred}`}>starred</span>
                )}
              </div>
              <div className={styles.emailPreviewBody}>{selectedEmail.body}</div>
              <div className={styles.actions} style={{ marginTop: '1rem' }}>
                <button
                  className={`${styles.btn} ${styles.btnSmall}`}
                  onClick={() => handleToggleRead(selectedEmail.id)}
                >
                  Toggle Read
                </button>
                <button
                  className={`${styles.btn} ${styles.btnSmall}`}
                  onClick={() => handleToggleStar(selectedEmail.id)}
                >
                  Toggle Star
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.emailPreview}>
              <div className={styles.emailPreviewBody}>Select an email to preview</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
