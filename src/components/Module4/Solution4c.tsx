import { useState } from 'react'
import styles from './Module4.module.css'

function TaskRow({ name }: { name: string }) {
  const [note, setNote] = useState('')

  return (
    <tr>
      <td>{name}</td>
      <td>
        <input
          className={styles.innerInput}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder='Add a note...'
        />
      </td>
    </tr>
  )
}

export function Solution4c() {
  const [filter, setFilter] = useState('')
  const [items] = useState([
    { id: 1, name: 'Build login page' },
    { id: 2, name: 'Add unit tests' },
    { id: 3, name: 'Fix navbar bug' },
    { id: 4, name: 'Deploy to staging' },
    { id: 5, name: 'Write documentation' },
  ])

  const displayed = items.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Task Board</div>
        <div className={styles.field} style={{ marginBottom: '1rem' }}>
          <span className={styles.fieldLabel}>Filter tasks</span>
          <input
            className={styles.input}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder='Search...'
          />
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Task</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((item) => (
                <TaskRow key={item.id} name={item.name} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
