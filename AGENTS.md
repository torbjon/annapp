## Process

- Do not remove existing comments
- Do not commit, until i ask you to do
- Do not comment or uncomment .env variables

## Code Style

- TypeScript required, explicit return types
- Error handling: Prefer explicit error handling with typed errors
- Naming: Use descriptive names, camelCase for JS/TS
- Comments: Explain _why_, not _what_. Avoid redundant comments.
- Jest tests: Single top-level describe block per file
- Tests: Use parameterized tests to exercise edge cases and document behavior
- Balance simplicity (fewer parts) with maintainability (understandable code)
- Separation of concerns: Keep different responsibilities in different places
- Reduce nesting: Use early returns and guard clauses
- Avoid over-engineering: Start simple, add complexity only when needed
- Always run linting after making changes

## Dev environment

- Run `pnpm install --filter <project_name>` to add workspace dependencies
- Check the name field in each package's package.json for the correct project name

## Testing

- `pnpm test` - run all tests
- `pnpm turbo run test --filter <project_name>` - run tests for specific package
- `pnpm jest -t "<test name>"` - focus on specific tests
- All tests must pass before committing
- Add/update tests for code changes

## Review

- Security: No hardcoded secrets, proper input validation, safe dependency usage
- Performance: No unnecessary loops, efficient data structures, avoid memory leaks
- Simplicity: Code is readable, minimal complexity, no premature optimization

## Pull Requests

- Title format: `[<project_name>] <Title>`
- Run `pnpm lint` and `pnpm test` before committing
