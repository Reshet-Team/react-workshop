import { useState, useEffect } from 'react'
import styles from './Module3.module.css'

const ALL_ITEMS = [
  'react',
  'react-dom',
  'react-router',
  'react-query',
  'react-hook-form',
  'redux',
  'redux-toolkit',
  'recoil',
  'relay',
  'rematch',
  'vue',
  'vite',
  'vitest',
  'valtio',
  'vanilla-extract',
  'angular',
  'astro',
  'axios',
  'apollo',
  'ant-design',
  'next',
  'nuxt',
  'node',
  'nest',
  'npm',
  'typescript',
  'tailwind',
  'trpc',
  'tanstack',
  'turbo',
]

function fakeSearch(query: string): Promise<string[]> {
  const delay = Math.random() * 800 + 200
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = ALL_ITEMS.filter((item) => item.includes(query.toLowerCase()))
      resolve(results)
    }, delay)
  })
}

export function Solution3b() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [requestLog, setRequestLog] = useState<string[]>([])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    // FIX: ignore flag discards stale responses
    let ignore = false
    setLoading(true)
    const startTime = Date.now()

    fakeSearch(query).then((data) => {
      if (ignore) return // Stale request — discard
      const elapsed = Date.now() - startTime
      setRequestLog((prev) => [
        ...prev,
        `"${query}" resolved in ${elapsed}ms (${data.length} results)`,
      ])
      setResults(data)
      setLoading(false)
    })

    return () => {
      ignore = true
    }
  }, [query])

  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Autocomplete Search</div>
        <input
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search packages...'
        />
        {loading && <div className={styles.loading}>Loading...</div>}
        {!loading && results.length > 0 && (
          <ul className={styles.suggestions}>
            {results.map((item) => (
              <li key={item} className={styles.suggestionItem}>
                {item}
              </li>
            ))}
          </ul>
        )}
        {!loading && query && results.length === 0 && (
          <div className={styles.loading}>No results for "{query}"</div>
        )}
      </div>

      <div className={styles.card}>
        <div className={styles.label}>Request Log</div>
        <ul className={styles.log}>
          {requestLog.map((entry, i) => (
            <li key={i} className={styles.logItem}>
              {entry}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
