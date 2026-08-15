## Module 4: Re-render Mental Model & Component Composition

### Core Mental Model

- When a parent component renders, **all of its children render by default**. This is normal and usually fast.
- Before reaching for `React.memo` or memoization hooks, optimize component structure using **composition** (`children` and slots) and **lifting state down**.

---

### Challenge 4.1: Lifting State Down (Isolating Hot State)

- **Scenario:** A dashboard page containing a heavy data table (500+ rows) and a simple color picker or text filter at the top of the parent container.
- **The Bug / Anti-Pattern:** Typing into the input updates top-level parent state, causing the entire dashboard and heavy table to re-render on every keystroke, introducing input lag.
- **Refactoring Goal:** Isolate the dynamic state by extracting the input into its own self-contained component (`SearchInput` / `ColorPicker`), preventing the parent and table from re-rendering.
- **Key Takeaway:** Move state down to the components that directly depend on it to localize re-renders.

---

### Challenge 4.2: The Children Prop Slot Optimization

- **Scenario:** An expandable container (`CollapsibleCard`) that wraps an expensive data chart component.
- **The Bug / Anti-Pattern:** Toggling the card open/closed causes the heavy chart component inside to re-render repeatedly.
- **Refactoring Goal:**
  - Refactor `CollapsibleCard` to accept and render `{children}`.
  - Pass `<HeavyChart />` as a child from the common parent: `<CollapsibleCard><HeavyChart /></CollapsibleCard>`.
  - Observe why `<HeavyChart />` skips rendering when `CollapsibleCard` toggles its internal state.
- **Key Takeaway:** Elements passed via the `children` prop are evaluated outside the wrapping component's render scope, bypassing child re-renders without `React.memo`.

---

### Challenge 4.3: Component Definition Inside Component Body

- **Scenario:** A dashboard where sub-components (e.g., `function TableRow() { ... }`) are declared directly inside the main `Dashboard` component body.
- **The Bug / Anti-Pattern:** On every state change in `Dashboard`, `TableRow` is recreated as a brand-new component type. React unmounts and remounts the entire DOM subtree, resetting local state, focus, and scroll position.
- **Refactoring Goal:** Move inner component declarations out to module scope or separate files, passing necessary data via props.
- **Key Takeaway:** Never declare components inside other components; doing so destroys component identity across renders.
