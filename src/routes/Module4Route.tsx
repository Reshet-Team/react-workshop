import { Link, useRouterState } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Exercise4a } from '../components/Module4/Exercise4a'
import { Exercise4b } from '../components/Module4/Exercise4b'
import { Exercise4c } from '../components/Module4/Exercise4c'
import styles from './ModuleLayout.module.css'

interface ExerciseTab {
  id: number
  label: string
  path: string
  Exercise: () => React.ReactElement
}

const EXERCISES: ExerciseTab[] = [
  { id: 1, label: 'Lifting State Down', path: '/module/4/exercise/1', Exercise: Exercise4a },
  { id: 2, label: 'Children Slot', path: '/module/4/exercise/2', Exercise: Exercise4b },
  { id: 3, label: 'Inner Components', path: '/module/4/exercise/3', Exercise: Exercise4c },
]

function getActiveIndex(pathname: string): number {
  if (pathname.endsWith('/exercise/2')) return 1
  if (pathname.endsWith('/exercise/3')) return 2
  return 0
}

export function Module4Route() {
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
          <h1 className={styles.moduleTitle}>Module 4: Re-renders & Composition</h1>
        </div>
      </header>

      <nav className={styles.tabNav}>
        {EXERCISES.map((ex) => (
          <Link
            key={ex.id}
            to={ex.path as '/module/4'}
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
