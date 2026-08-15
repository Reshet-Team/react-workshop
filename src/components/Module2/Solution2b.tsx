import { useState } from 'react'
import styles from './Module2.module.css'

interface User {
  id: number
  name: string
  email: string
  bio: string
}

const USERS: User[] = [
  { id: 1, name: 'Alice Chen', email: 'alice@example.com', bio: 'Frontend engineer at Acme Inc.' },
  {
    id: 2,
    name: 'Bob Martinez',
    email: 'bob@example.com',
    bio: 'Full-stack developer, React enthusiast.',
  },
  {
    id: 3,
    name: 'Carol Kim',
    email: 'carol@example.com',
    bio: 'UX engineer specializing in design systems.',
  },
]

function UserProfileEditor({ initialUser }: { initialUser: User }) {
  const [user, setUser] = useState<User>(initialUser)

  return (
    <div className={styles.card}>
      <div className={styles.label}>Editing: {initialUser.name}</div>
      <div className={styles.profileForm}>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>Name</span>
          <input
            className={styles.input}
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>Email</span>
          <input
            className={styles.input}
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>Bio</span>
          <input
            className={styles.input}
            value={user.bio}
            onChange={(e) => setUser({ ...user, bio: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}

export function Solution2b() {
  const [selectedId, setSelectedId] = useState<number>(USERS[0].id)
  const selectedUser = USERS.find((u) => u.id === selectedId)!

  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Select User</div>
        <div className={styles.actions}>
          {USERS.map((user) => (
            <button
              key={user.id}
              className={`${styles.btn} ${selectedId === user.id ? styles.btnPrimary : ''}`}
              onClick={() => setSelectedId(user.id)}
            >
              {user.name}
            </button>
          ))}
        </div>
      </div>
      {/* FIX: key={selectedUser.id} forces remount when user changes */}
      <UserProfileEditor key={selectedUser.id} initialUser={selectedUser} />
    </div>
  )
}
