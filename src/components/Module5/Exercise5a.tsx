import { useState } from 'react'
import styles from './Module5.module.css'

function ChatFeed() {
  const [messages, setMessages] = useState<string[]>([
    'Hey, welcome to the chat!',
    'How is the workshop going?',
  ])
  const [draft, setDraft] = useState('')

  const handleSend = (): void => {
    if (!draft.trim()) return
    setMessages((prev) => [...prev, draft])
    setDraft('')

    const feed = document.getElementById('chat-feed')
    if (feed) {
      feed.scrollTop = feed.scrollHeight
    }

    const input = document.getElementById('chat-input') as HTMLTextAreaElement | null
    if (input) {
      input.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div>
      <div id='chat-feed' className={styles.feed}>
        {messages.map((msg, i) => (
          <div key={i} className={`${styles.message} ${i >= 2 ? styles.messageSelf : ''}`}>
            {msg}
          </div>
        ))}
      </div>
      <div className={styles.inputRow}>
        <textarea
          id='chat-input'
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

export function Exercise5a() {
  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Chat Feed A</div>
        <ChatFeed />
      </div>
      <div className={styles.card}>
        <div className={styles.label}>Chat Feed B</div>
        <p className={styles.hint}>
          Send a message in Feed B — notice the scroll and focus jump to Feed A instead, because
          both use the same element IDs.
        </p>
        <ChatFeed />
      </div>
    </div>
  )
}
