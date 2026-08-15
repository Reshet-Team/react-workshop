import { useState, useMemo } from 'react'
import styles from './Module2.module.css'

interface Product {
  id: number
  name: string
  category: string
  price: number
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 79 },
  { id: 2, name: 'Running Shoes', category: 'Sports', price: 120 },
  { id: 3, name: 'Coffee Maker', category: 'Kitchen', price: 49 },
  { id: 4, name: 'Mechanical Keyboard', category: 'Electronics', price: 149 },
  { id: 5, name: 'Yoga Mat', category: 'Sports', price: 35 },
  { id: 6, name: 'Cast Iron Skillet', category: 'Kitchen', price: 45 },
  { id: 7, name: 'USB-C Hub', category: 'Electronics', price: 39 },
  { id: 8, name: 'Tennis Racket', category: 'Sports', price: 89 },
  { id: 9, name: 'Blender', category: 'Kitchen', price: 65 },
  { id: 10, name: 'Monitor Stand', category: 'Electronics', price: 55 },
  { id: 11, name: 'Dumbbell Set', category: 'Sports', price: 150 },
  { id: 12, name: 'Chef Knife', category: 'Kitchen', price: 75 },
]

const CATEGORIES = ['All', ...Array.from(new Set(PRODUCTS.map((p) => p.category)))]

type SortKey = 'name' | 'price'

export function Solution2a() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [sortBy, setSortBy] = useState<SortKey>('name')

  // Derived: no state, no effects — computed during render
  const displayedProducts = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    result = [...result].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price
      return a.name.localeCompare(b.name)
    })
    return result
  }, [searchQuery, selectedCategory, sortBy])

  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Product Catalog</div>
        <div className={styles.row}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Search</span>
            <input
              className={styles.input}
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search products...'
            />
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Category</span>
            <select
              className={styles.select}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Sort by</span>
            <select
              className={styles.select}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
            >
              <option value='name'>Name</option>
              <option value='price'>Price</option>
            </select>
          </div>
        </div>
        <div className={styles.stats} style={{ marginTop: '1rem' }}>
          <span className={styles.stat}>Showing: {displayedProducts.length}</span>
          <span className={styles.stat}>Total: {PRODUCTS.length}</span>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
