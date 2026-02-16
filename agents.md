## authority & workflow
- ai must never commit code or modify git history
- all changes must be reviewed and committed manually by the developer
- ai should propose changes in small, reviewable chunks
- do not refactor unrelated files without explicit instruction

## general engineering principles
- prefer simple, readable code over clever abstractions
- follow the existing folder structure strictly
- do not introduce new libraries unless explicitly approved
- do not change api contracts without updating frontend + tests
- avoid premature optimization
- keep functions small and predictable

## backend (flask)
- keep business logic out of route handlers
- always validate request payloads using schemas
- ensure invalid states are impossible (e.g., task status must be one of: todo, in_progress, done)
- return proper http status codes and structured error responses
- never swallow exceptions silently; log meaningful errors
- add minimal pytest coverage for each new endpoint

## frontend (react + react query + jotai)
- keep api calls in a dedicated api layer
- wrap react query logic in custom hooks
- use jotai atoms only for client-side ui state, not server state
- always handle loading and error states in components
- keep components small and composable

## ai behavior constraints
- if unsure about a design decision, ask before implementing
- generated code must be explained briefly when non-trivial
- never introduce breaking changes without highlighting them
- do not copy code from proprietary or confidential sources

## security & integrity
- never include secrets or credentials in code
- do not reuse any employer-owned code or prompts
