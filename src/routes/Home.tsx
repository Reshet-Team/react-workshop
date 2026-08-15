import { Link } from '@tanstack/react-router'
import { BookOpen, Zap, Layers, RefreshCw, LayoutDashboard, Pointer } from 'lucide-react'
import styles from './Home.module.css'

interface ModuleCard {
  id: number
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  concepts: string[]
}

const modules: ModuleCard[] = [
  {
    id: 1,
    title: 'The Render Loop & State as a Snapshot',
    subtitle: 'useState Closures',
    description:
      'Understand why state is a fixed value bound to a specific render pass—not a live mutable variable. Debug stale closures and batching pitfalls.',
    icon: <Zap size={24} />,
    concepts: ['Stale closures', 'Batching', 'Functional updaters', 'Async snapshots'],
  },
  {
    id: 2,
    title: 'Derived State vs. Stored State',
    subtitle: 'Single Source of Truth',
    description:
      'Learn to calculate data on the fly during render instead of storing intermediate duplicates in state that cause cascading re-renders.',
    icon: <Layers size={24} />,
    concepts: ['Derived values', 'Redundant state', 'useEffect anti-patterns', 'useMemo'],
  },
  {
    id: 3,
    title: 'Untangling useEffect',
    subtitle: 'Synchronization vs. Events',
    description:
      'Effects are escape hatches for external systems—not pipelines for internal data. Refactor domino-effect chains into direct event handlers.',
    icon: <RefreshCw size={24} />,
    concepts: ['Effect cascades', 'Event handlers', 'localStorage sync', 'Batched updates'],
  },
  {
    id: 4,
    title: 'Re-render Mental Model & Composition',
    subtitle: 'Structure Over Memoization',
    description:
      'Re-rendering a parent re-renders children by default. Learn to fix performance through component structure before reaching for React.memo.',
    icon: <LayoutDashboard size={24} />,
    concepts: ['Lifting state down', 'Children as slots', 'Composition patterns', 'Avoiding memo'],
  },
  {
    id: 5,
    title: 'Refs & Escape Hatches',
    subtitle: 'useRef Deep Dive',
    description:
      'A ref is a secret pocket for mutable data outside the render loop. Master interval management, DOM access, and instance-scoped values.',
    icon: <Pointer size={24} />,
    concepts: ['useRef vs. state', 'Interval management', 'DOM refs', 'Instance isolation'],
  },
]

export function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoSection}>
            <BookOpen size={32} color='#6366f1' />
            <div>
              <h1 className={styles.title}>React Advanced Workshop</h1>
              <p className={styles.tagline}>
                Master the mental models behind React's rendering behavior
              </p>
            </div>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeText}>5 Modules</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.intro}>
          <p className={styles.introText}>
            Each module presents a <strong>buggy exercise</strong> alongside its{' '}
            <strong>optimized solution</strong>. Interact with both side-by-side to observe
            rendering differences in real time. Track re-renders via diagnostic counters.
          </p>
        </section>

        <section className={styles.grid}>
          {modules.map((mod) => (
            <Link key={mod.id} to={`/module/${mod.id}` as '/module/1'} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrap}>{mod.icon}</div>
                <span className={styles.moduleNumber}>Module {mod.id}</span>
              </div>
              <h2 className={styles.cardTitle}>{mod.title}</h2>
              <p className={styles.cardSubtitle}>{mod.subtitle}</p>
              <p className={styles.cardDescription}>{mod.description}</p>
              <div className={styles.conceptList}>
                {mod.concepts.map((concept) => (
                  <span key={concept} className={styles.conceptTag}>
                    {concept}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  )
}
