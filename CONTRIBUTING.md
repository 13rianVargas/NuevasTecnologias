# Contributing

## Commit message convention

Use conventional commits with this exact format:

`type: short message in english`

Rules:
- Use lowercase.
- Do not end the message with a period.
- Do not use scopes in parentheses.

Valid types:
- `feat`
- `fix`
- `chore`
- `docs`
- `refactor`
- `test`
- `release`
- `hotfix`

## Examples

Correct:
- `feat: add user profile endpoint`
- `fix: handle null response in auth flow`
- `docs: add setup instructions for local development`

Incorrect:
- `feat(api): add user profile endpoint` (scope is not allowed)
- `Fix: Handle null response in auth flow.` (must be lowercase and no final period)
- `update readme` (does not follow conventional commits format)
