import { useState } from 'react'
import styles from './Module1.module.css'

interface Task {
  id: number
  title: string
  completed: boolean
}

const INITIAL_TASKS: Task[] = [
  { id: 1, title: 'Read React docs on state', completed: false },
  { id: 2, title: 'Complete Module 1 exercises', completed: false },
  { id: 3, title: 'Review snapshot mental model', completed: false },
  { id: 4, title: 'Practice immutable updates', completed: false },
]

export function Exercise1c() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
  const [dummy, setDummy] = useState(0)

  const handleToggle = (index: number): void => {
    tasks[index].completed = !tasks[index].completed
    setTasks(tasks)
  }

  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Task List</div>
        <p className={styles.hint}>
          Toggling a checkbox doesn't update the UI. Click "Force re-render" to see the mutation was
          applied silently.
        </p>
        <ul className={styles.list}>
          {tasks.map((task, index) => (
            <li key={task.id} className={styles.listItem}>
              <label>
                <input
                  type='checkbox'
                  className={styles.checkbox}
                  checked={task.completed}
                  onChange={() => handleToggle(index)}
                />
                <span className={task.completed ? styles.completed : ''}>{task.title}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className={styles.actions} style={{ marginTop: '1rem' }}>
          <button className={styles.btn} onClick={() => setDummy((d) => d + 1)}>
            Force re-render ({dummy})
          </button>
          <button
            className={`${styles.btn} ${styles.btnDanger}`}
            onClick={() => setTasks(INITIAL_TASKS.map((t) => ({ ...t })))}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
