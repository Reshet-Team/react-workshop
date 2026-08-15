import { useState, useRef } from 'react'
import styles from './Module4.module.css'

function HeavyChart() {
  const renderCount = useRef(0)
  renderCount.current += 1

  const bars = Array.from({ length: 30 }, (_, i) => {
    let val = 0
    for (let j = 0; j < 5000; j++) {
      val += Math.sin(i * j) * 0.001
    }
    return (Math.abs(val * 1000) % 80) + 20
  })

  return (
    <div>
      <span className={styles.renderCount}>Chart renders: {renderCount.current}</span>
      <div className={styles.chart}>
        {bars.map((height, i) => (
          <div key={i} className={styles.chartBar} style={{ height: `${height}%` }} />
        ))}
      </div>
    </div>
  )
}

function CollapsibleCard({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={styles.collapsible}>
      <div className={styles.collapsibleHeader} onClick={() => setIsOpen((prev) => !prev)}>
        <span className={styles.collapsibleTitle}>{title}</span>
        <span>{isOpen ? '▾' : '▸'}</span>
      </div>
      <div className={styles.collapsibleBody} style={{ display: isOpen ? 'block' : 'none' }}>
        <HeavyChart />
      </div>
    </div>
  )
}

export function Exercise4b() {
  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Expandable Panel</div>
        <p className={styles.hint}>
          Toggle the panel open and closed — the chart re-renders every time even though it's just
          being shown/hidden.
        </p>
        <CollapsibleCard title='Revenue Chart' />
      </div>
    </div>
  )
}
