## Module 1: The Render Loop & State as a Snapshot

### Core Mental Model

- State is not a mutable variable; it is a snapshot of data frozen in time for a specific render execution.
- The render pass is a pure calculation: $\text{UI} = f(\text{State})$.
- Calling `setState` does not change the variable in-flight—it schedules a new render pass.

---

### Challenge 1.1: The Batching Counter & Delayed Alert

- **Scenario:** A shopping cart widget with a "Quick Add (+3)" button and an "Alert Final Quantity after Delay" button using `setTimeout`.
- **The Bug / Anti-Pattern:**
  - Clicking `+3` executes `setQuantity(quantity + 1)` three times synchronously, but the quantity only increases by 1.
  - Clicking "Alert after 3s" captures the initial quantity; if the user clicks `+` during those 3 seconds, the alert displays the old snapshot number.
- **Refactoring Goal:**
  - Convert consecutive updates to updater functions (`setQuantity(prev => prev + 1)`).
  - Trace and explain why the timer captures the snapshot of the render pass in which it was created.
- **Key Takeaway:** State setter functions schedule updates for the _next_ render; updater functions allow chaining state transitions reliably.

---

### Challenge 1.2: The "Read Immediately After Set" Form

- **Scenario:** A registration form updates a `userData` state object on submission and immediately calls an analytics logging function: `setUserData(newData); sendAnalytics(userData);`.
- **The Bug / Anti-Pattern:** The analytics payload consistently sends empty or previous form data because `useState` updates are asynchronous to the current execution thread.
- **Refactoring Goal:** Eliminate reliance on state immediately after calling `setState`. Pass the raw data payload directly into both the state setter and the analytics helper.
- **Key Takeaway:** Use the local variable for immediate synchronous operations instead of attempting to read state right after scheduling a state update.

---

### Challenge 1.3: Object Mutation & The "Ghost Click"

- **Scenario:** A task manager component with a list of tasks. When toggling task completion, the handler mutates the object directly: `tasks[index].completed = true; setTasks(tasks);`.
- **The Bug / Anti-Pattern:** Toggling the checkbox does not trigger a re-render because the array reference remains identical. The UI only updates when an unrelated state update forces a render.
- **Refactoring Goal:** Refactor the handler to use immutable array transformations (`.map()`) and object spreading (`{ ...task, completed: !task.completed }`).
- **Key Takeaway:** React checks referential equality (`Object.is`) to determine if a re-render is required. In-place mutations break React's change detection.
