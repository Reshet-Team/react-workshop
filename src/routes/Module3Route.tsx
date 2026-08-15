import { Link, useRouterState } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Exercise3a } from '../components/Module3/Exercise3a'
import { Exercise3b } from '../components/Module3/Exercise3b'
import { Exercise3c } from '../components/Module3/Exercise3c'
import styles from './ModuleLayout.module.css'

interface ExerciseTab {
  id: number
  label: string
  path: string
  Exercise: () => React.ReactElement
}

const EXERCISES: ExerciseTab[] = [
  { id: 1, label: 'Domino Form', path: '/module/3/exercise/1', Exercise: Exercise3a },
  { id: 2, label: 'Race Condition', path: '/module/3/exercise/2', Exercise: Exercise3b },
  { id: 3, label: 'Listener Leak', path: '/module/3/exercise/3', Exercise: Exercise3c },
]

function getActiveIndex(pathname: string): number {
  if (pathname.endsWith('/exercise/2')) return 1
  if (pathname.endsWith('/exercise/3')) return 2
  return 0
}

export function Module3Route() {
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
          <h1 className={styles.moduleTitle}>Module 3: Untangling useEffect</h1>
        </div>
      </header>

      <nav className={styles.tabNav}>
        {EXERCISES.map((ex) => (
          <Link
            key={ex.id}
            to={ex.path as '/module/3'}
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
