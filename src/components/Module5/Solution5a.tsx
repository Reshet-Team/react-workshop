import { useState, useRef } from 'react'
import styles from './Module5.module.css'

function ChatFeed() {
  const [messages, setMessages] = useState<string[]>([
    'Hey, welcome to the chat!',
    'How is the workshop going?',
  ])
  const [draft, setDraft] = useState('')
  const feedRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = (): void => {
    if (!draft.trim()) return
    setMessages((prev) => [...prev, draft])
    setDraft('')

    setTimeout(() => {
      feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: 'smooth' })
    }, 0)

    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div>
      <div ref={feedRef} className={styles.feed}>
        {messages.map((msg, i) => (
          <div key={i} className={`${styles.message} ${i >= 2 ? styles.messageSelf : ''}`}>
            {msg}
          </div>
        ))}
      </div>
      <div className={styles.inputRow}>
        <textarea
          ref={inputRef}
          className={styles.textarea}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Type a message...'
          rows={1}
        />
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  )
}

export function Solution5a() {
  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Chat Feed A</div>
        <ChatFeed />
      </div>
      <div className={styles.card}>
        <div className={styles.label}>Chat Feed B</div>
        <ChatFeed />
      </div>
    </div>
  )
}
