## Module 2: Derived State vs. Stored State

### Core Mental Model

- If a value can be computed from existing props or state during render, **do not store it in state**.
- Avoid maintaining redundant sources of truth that must be manually synchronized.

---

### Challenge 2.1: The Over-Stateful Search & Filter List

- **Scenario:** An e-commerce product table with a search input, category dropdown, and sorting options.
- **The Bug / Anti-Pattern:** The component manages 6 separate state variables: `products`, `searchQuery`, `selectedCategory`, `filteredProducts`, `sortedProducts`, and `visibleCount`. Multiple `useEffect` hooks listen to each state change to compute the downstream values.
- **Refactoring Goal:**
  - Remove `filteredProducts`, `sortedProducts`, and `visibleCount` from state.
  - Compute the filtered and sorted array directly inside the component body during render.
- **Key Takeaway:** Calculate derived data on the fly during rendering to eliminate out-of-sync bugs and simplify component logic.

---

### Challenge 2.2: The Syncing Props-to-State Trap

- **Scenario:** A `UserProfileEditor` receives `initialUser` via props and copies it into internal state: `const [user, setUser] = useState(initialUser)`.
- **The Bug / Anti-Pattern:** When switching users from a parent sidebar, the form continues to display the previous user's data because `useState` only evaluates its initial value on mount. An attempted workaround with `useEffect(() => setUser(initialUser), [initialUser])` introduces layout flickering.
- **Refactoring Goal:**
  - Remove the synchronizing effect.
  - Use the `key` prop pattern (`<UserProfileEditor key={user.id} />`) to reset the component's state automatically when the selected identity changes.
- **Key Takeaway:** Use `key` to reset component state cleanly instead of mirroring props in state and synchronizing via effects.

---

### Challenge 2.3: The Duplicated Selection State

- **Scenario:** An email client inbox showing a list of emails. Clicking an email selects it for viewing in a side preview panel.
- **The Bug / Anti-Pattern:** The component stores both `emails` (array of objects) and `selectedEmail` (entire email object) in state. When marking an email as "Read" or "Starred", the list updates, but `selectedEmail` remains stale.
- **Refactoring Goal:** Store only `selectedEmailId: string | null` in state, and derive `const selectedEmail = emails.find(e => e.id === selectedEmailId)` during render.
- **Key Takeaway:** Store the minimum viable identifier (ID) in state rather than duplicating whole objects across multiple state variables.
