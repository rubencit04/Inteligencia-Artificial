# AGENTS.md - Agent Guidelines for This Repository

## Project Overview

This is a simple vanilla JavaScript memory card game. It consists of:
- `index.html` - Main HTML page
- `script.js` - Game logic (vanilla JavaScript)
- `style.css` - Styling

No build system, frameworks, or external dependencies are used.

---

## Build / Development Commands

### Running the Project
Simply open `index.html` in a web browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (if available)
npx serve .
```

Then visit `http://localhost:8000`

### Linting
No formal linter is configured. For JavaScript, consider using ESLint with basic rules.

### Testing
No test framework is configured. To add tests, consider:
- Jest for unit tests
- Playwright or Cypress for e2e tests

To run a single test with Jest (once configured):
```bash
npm test -- --testNamePattern="test name"
```

---

## Code Style Guidelines

### General Principles
- Keep code simple and readable
- Use vanilla JavaScript (no frameworks unless explicitly required)
- Avoid unnecessary dependencies

### JavaScript Style

**Formatting**
- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons at the end of statements
- Use spaces around operators: `const x = 1 + 2`

**Naming Conventions**
- Variables/functions: camelCase (`createBoard`, `flippedCards`)
- Constants: UPPER_SNAKE_CASE for magic values (`MAX_PAIRS`)
- Classes: PascalCase (if used)

**Functions**
- Use function declarations or arrow functions consistently
- Keep functions small and focused (< 30 lines)
- Use descriptive names (`flipCard` not `fc`)

**Variables**
- Use `const` by default, `let` when mutation is needed
- Avoid `var`
- Declare variables close to their first use
- Group related variables together

**Error Handling**
- Use try/catch for async operations
- Handle null/undefined checks explicitly
- Add error logging for debugging

**DOM Manipulation**
- Cache DOM references when used multiple times
- Use event delegation where appropriate
- Keep DOM updates minimal

### CSS Style

- Use meaningful class names (kebab-case)
- Group related properties together
- Use CSS variables for repeated values
- Keep selectors simple and specific

### HTML Style

- Use semantic HTML elements
- Add proper lang attribute
- Include meta tags for accessibility
- Keep attributes in consistent order

---

## Project Structure

```
.
├── index.html      # Main HTML file
├── script.js       # Game logic
└── style.css       # Styles
```

---

## Common Tasks

### Adding a New Feature
1. Understand the game logic flow in `script.js`
2. Add any new DOM elements to `index.html`
3. Add corresponding styles in `style.css`
4. Test in browser

### Debugging
- Open browser DevTools (F12)
- Check Console for errors
- Use breakpoints in Sources tab

---

## Notes for Agents

- This is a beginner-friendly project
- No TypeScript, no React, no build tools
- All code runs directly in the browser
- Changes to JS/CSS/HTML take effect immediately on refresh
