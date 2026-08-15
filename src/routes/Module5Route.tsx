import { Link, useRouterState } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Exercise5a } from '../components/Module5/Exercise5a'
import { Exercise5b } from '../components/Module5/Exercise5b'
import { Exercise5c } from '../components/Module5/Exercise5c'
import styles from './ModuleLayout.module.css'

interface ExerciseTab {
  id: number
  label: string
  path: string
  Exercise: () => React.ReactElement
}

const EXERCISES: ExerciseTab[] = [
  { id: 1, label: 'DOM Focus & Scroll', path: '/module/5/exercise/1', Exercise: Exercise5a },
  { id: 2, label: 'Interval ID Trap', path: '/module/5/exercise/2', Exercise: Exercise5b },
  { id: 3, label: 'Ref During Render', path: '/module/5/exercise/3', Exercise: Exercise5c },
]

function getActiveIndex(pathname: string): number {
  if (pathname.endsWith('/exercise/2')) return 1
  if (pathname.endsWith('/exercise/3')) return 2
  return 0
}

export function Module5Route() {
  const routerState = useRouterState()
  const activeIndex = getActiveIndex(routerState.location.pathname)
  const active = EXERCISES[activeIndex]
  const ExerciseComponent = active.Exercise

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to='/' className={styles.backLink}>
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className={styles.moduleTitle}>Module 5: Refs & Escape Hatches</h1>
        </div>
      </header>

      <nav className={styles.tabNav}>
        {EXERCISES.map((ex) => (
          <Link
            key={ex.id}
            to={ex.path as '/module/5'}
            className={`${styles.tab} ${ex.id === active.id ? styles.tabActive : ''}`}
          >
            {ex.id}. {ex.label}
          </Link>
        ))}
      </nav>

      <div className={styles.panel}>
        <ExerciseComponent />
      </div>
    </div>
  )
}
