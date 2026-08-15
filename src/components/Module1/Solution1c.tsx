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

export function Solution1c() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)

  const handleToggle = (id: number): void => {
    // FIX: Immutable update — new array with a new object for the toggled task
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    )
  }

  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Task List</div>
        <ul className={styles.list}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.listItem}>
              <label>
                <input
                  type='checkbox'
                  className={styles.checkbox}
                  checked={task.completed}
                  onChange={() => handleToggle(task.id)}
                />
                <span className={task.completed ? styles.completed : ''}>{task.title}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className={styles.actions} style={{ marginTop: '1rem' }}>
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
