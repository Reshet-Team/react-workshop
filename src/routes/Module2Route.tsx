import { Link, useRouterState } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Exercise2a } from '../components/Module2/Exercise2a'
import { Exercise2b } from '../components/Module2/Exercise2b'
import { Exercise2c } from '../components/Module2/Exercise2c'
import styles from './ModuleLayout.module.css'

interface ExerciseTab {
  id: number
  label: string
  path: string
  Exercise: () => React.ReactElement
}

const EXERCISES: ExerciseTab[] = [
  { id: 1, label: 'Over-Stateful List', path: '/module/2/exercise/1', Exercise: Exercise2a },
  { id: 2, label: 'Props-to-State Trap', path: '/module/2/exercise/2', Exercise: Exercise2b },
  { id: 3, label: 'Duplicated Selection', path: '/module/2/exercise/3', Exercise: Exercise2c },
]

function getActiveIndex(pathname: string): number {
  if (pathname.endsWith('/exercise/2')) return 1
  if (pathname.endsWith('/exercise/3')) return 2
  return 0
}

export function Module2Route() {
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
          <h1 className={styles.moduleTitle}>Module 2: Derived State vs. Stored State</h1>
        </div>
      </header>

      <nav className={styles.tabNav}>
        {EXERCISES.map((ex) => (
          <Link
            key={ex.id}
            to={ex.path as '/module/2'}
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
