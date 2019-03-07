workflow "Lint on PR" {
  on = "pull_request"
  resolves = ["Run ESLint"]
}

action "Run ESLint" {
  uses = "stefanoeb/eslint-action"
}
