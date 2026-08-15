## Module 3: Untangling `useEffect` (Synchronization)

### Core Mental Model

- Effects are escape hatches for synchronizing with external, non-React systems (DOM APIs, WebSockets, timers, network requests).
- Effects are not meant for internal data flow or responding to user actions. User actions belong in **Event Handlers**.

---

### Challenge 3.1: The Domino Form (Action in Effect vs. Handler)

- **Scenario:** A multi-step checkout form. When clicking "Submit Step 1", the handler sets `isStepOneSubmitted = true`, and a `useEffect` listens to that boolean to run validation, advance the step, and trigger a network request.
- **The Bug / Anti-Pattern:** Chained effects cause cascading renders, screen flashes, and unintended triggers during initial mount or in Strict Mode.
- **Refactoring Goal:** Remove the intermediate booleans and effects. Move validation, navigation, and API calls directly into the `handleSubmit` event handler.
- **Key Takeaway:** User-initiated actions belong in event handlers, not in `useEffect`.

---

### Challenge 3.2: The Race-Condition Search Bar

- **Scenario:** An autocomplete input that fetches suggestions from an API as the user types.
- **The Bug / Anti-Pattern:** If the user types quickly (e.g., "react"), the network response for "rea" may resolve _after_ the response for "react", overwriting the search results with outdated data.
- **Refactoring Goal:** Implement a cleanup function in `useEffect` (using an `ignore` boolean flag or `AbortController`) to discard responses from stale requests.
- **Key Takeaway:** Asynchronous operations inside effects must include cleanup mechanisms to handle race conditions.

---

### Challenge 3.3: The Global Listener & Window Resize Leak

- **Scenario:** A navigation bar component that registers `window.addEventListener('resize', ...)` and `window.addEventListener('keydown', ...)` for keyboard shortcuts.
- **The Bug / Anti-Pattern:** The effect lacks a cleanup return function. Mounting, unmounting, or re-rendering registers duplicate listeners on `window`, leading to memory leaks and erratic behavior.
- **Refactoring Goal:** Add explicit cleanup returning `window.removeEventListener(...)` and verify cleanup execution on unmount.
- **Key Takeaway:** Every subscription or event listener created inside an effect must have an equal and opposite cleanup function.
