import { useState, useEffect } from 'react'
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

export function Exercise2a() {
  const [products] = useState<Product[]>(PRODUCTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [sortBy, setSortBy] = useState<SortKey>('name')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS)
  const [sortedProducts, setSortedProducts] = useState<Product[]>(PRODUCTS)
  const [visibleCount, setVisibleCount] = useState<number>(PRODUCTS.length)

  useEffect(() => {
    const filtered = products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    setFilteredProducts(filtered)
  }, [searchQuery, selectedCategory, products])

  useEffect(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price
      return a.name.localeCompare(b.name)
    })
    setSortedProducts(sorted)
  }, [filteredProducts, sortBy])

  useEffect(() => {
    setVisibleCount(sortedProducts.length)
  }, [sortedProducts])

  return (
    <div className={styles.exercise}>
      <div className={styles.card}>
        <div className={styles.label}>Product Catalog</div>
        <p className={styles.hint}>
          Filtering and sorting work, but the component uses 6 state variables and 3 useEffect hooks
          to compute what could be derived in a single pass.
        </p>
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
          <span className={styles.stat}>Showing: {visibleCount}</span>
          <span className={styles.stat}>Total: {products.length}</span>
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
            {sortedProducts.map((product) => (
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
