# React Advanced Workshop — Challenges

Interactive exercises exploring React's core mental models. Each module contains buggy implementations that demonstrate common anti-patterns — your goal is to identify and fix them.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Modules

### Module 1: State as a Snapshot

State is not a mutable variable — it's a frozen value for a specific render pass.

1. **Batching & Delayed Alert** — sequential `setState` calls and stale closures in timers
2. **Read After Set** — reading state immediately after calling `setState`
3. **Object Mutation** — in-place mutations that bypass React's change detection

### Module 2: Derived State vs. Stored State

If a value can be computed from existing state, don't store it separately.

1. **Over-Stateful List** — redundant state + useEffect chains for filtering/sorting
2. **Props-to-State Trap** — copying props into state and syncing with effects
3. **Duplicated Selection** — storing entire objects instead of IDs

### Module 3: Untangling useEffect

Effects synchronize with external systems — they're not event handlers.

1. **Domino Form** — chained effects for logic that belongs in an event handler
2. **Race Condition** — async responses resolving out of order
3. **Listener Leak** — event listeners without cleanup

### Module 4: Re-renders & Composition

Optimize structure before reaching for memoization.

1. **Lifting State Down** — isolating hot state to prevent sibling re-renders
2. **Children Slot** — passing content as children to avoid re-rendering stable elements
3. **Inner Components** — component definitions inside component bodies destroying identity

### Module 5: Refs & Escape Hatches

Refs hold mutable values outside the render loop without triggering re-renders.

1. **DOM Focus & Scroll** — replacing `getElementById` with scoped refs
2. **Interval ID Trap** — shared module-level variables vs. instance-scoped refs
3. **Ref During Render** — mutating refs during render breaks purity in Strict Mode

## Tech Stack

- React 19 + TypeScript
- Vite
- TanStack Router
- CSS Modules
