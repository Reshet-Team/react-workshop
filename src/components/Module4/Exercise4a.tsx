import { useState, useRef } from 'react'
import styles from './Module4.module.css'

const NUM_ROWS = 8_000

const ROWS: { id: number; name: string; value: number }[] = []
for (let i = 0; i < NUM_ROWS; i++) {
  let hash = 0
  for (let j = 0; j < 500; j++) {
    hash = Math.sin(i * j + hash) * 10000
  }
  ROWS.push({ id: i, name: `Row ${i + 1}`, value: Math.abs(Math.round(hash)) % 10000 })
}

function HeavyTable({ filter }: { filter: string }) {
  const renderCount = useRef(0)
  renderCount.current += 1

  const displayed = filter
    ? ROWS.filter((r) => r.name.toLowerCase().includes(filter.toLowerCase()))
    : ROWS

  return (
    <div>
      <span className={styles.renderCount}>Table renders: {renderCount.current}</span>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function Exercise4a() {
  const [filter, setFilter] = useState('')
  const [committedFilter, setCommittedFilter] = useState('')

  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Dashboard</div>
        <p className={styles.hint}>
          Type in the filter input — notice the severe input lag caused by the heavy table
          re-rendering on every keystroke.
        </p>
        <div className={styles.row}>
          <div className={styles.field} style={{ flex: 1 }}>
            <span className={styles.fieldLabel}>Filter</span>
            <input
              className={styles.input}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder='Type here...'
            />
          </div>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => setCommittedFilter(filter)}
          >
            Search
          </button>
        </div>
      </div>
      <div className={styles.card}>
        <HeavyTable filter={committedFilter} />
      </div>
    </div>
  )
}
