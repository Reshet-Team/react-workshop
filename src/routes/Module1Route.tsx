import { Link, useRouterState } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Exercise1a } from '../components/Module1/Exercise1a'
import { Exercise1b } from '../components/Module1/Exercise1b'
import { Exercise1c } from '../components/Module1/Exercise1c'
import styles from './ModuleLayout.module.css'

interface ExerciseTab {
  id: number
  label: string
  path: string
  Exercise: () => React.ReactElement
}

const EXERCISES: ExerciseTab[] = [
  { id: 1, label: 'Batching & Delayed Alert', path: '/module/1/exercise/1', Exercise: Exercise1a },
  { id: 2, label: 'Read After Set', path: '/module/1/exercise/2', Exercise: Exercise1b },
  { id: 3, label: 'Object Mutation', path: '/module/1/exercise/3', Exercise: Exercise1c },
]

function getActiveIndex(pathname: string): number {
  if (pathname.endsWith('/exercise/2')) return 1
  if (pathname.endsWith('/exercise/3')) return 2
  return 0
}

export function Module1Route() {
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
          <h1 className={styles.moduleTitle}>Module 1: State as a Snapshot</h1>
        </div>
      </header>

      <nav className={styles.tabNav}>
        {EXERCISES.map((ex) => (
          <Link
            key={ex.id}
            to={ex.path as '/module/1'}
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
