# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Babel plugin (`babel-plugin-remove-react-element`) that strips every usage of a named JSX element from source code, replacing it with `null`. It's used to produce separate bundles (e.g. a mobile bundle vs. a desktop bundle) from a single React codebase by removing the elements meant for the other platform, so a bundler/minifier can then dead-code-eliminate the components those elements referenced.

## Repository layout

This is an npm/yarn workspaces monorepo (root `package.json`) with two packages under `packages/`:

- `packages/babel-plugin-remove-react-element` — the actual plugin. All logic lives in `src/index.js` (a single Babel visitor for `JSXElement` that removes elements whose name is in the `elementNames` option). Built with `@babel/cli` into `dist/`.
- `packages/remove-react-element-test-project` — an integration test project. It webpack-bundles a small React app twice (once removing `Desktop`, once removing `Mobile`, see `webpack.config.js`), then asserts on the resulting bundle contents (`__tests__/desktop-bundle.js`, `__tests__/mobile-bundle.js`) to prove the plugin correctly produces platform-specific bundles.

The root `dist/` and root-level build artifacts are stale/legacy; real work happens inside `packages/*`.

## Commands

Run from the repo root (these fan out to both workspaces via `npm run <script> --workspaces`):

- `npm install` — install all workspace dependencies.
- `npm run build` — babel-compiles the plugin (`packages/babel-plugin-remove-react-element`) and webpack-bundles the test project.
- `npm run test` — runs both workspaces' test suites. In the test-project workspace, `pretest` triggers a fresh webpack build first, so bundle assertions always run against current plugin code.
- `npm run clean` / `npm run purge` — remove build output, or build output + `node_modules`, in every workspace.
- `npm run bump` — bumps the root package version, propagates it to both workspace `package.json` files via `scripts/version.js`, and prints the git commit/tag/push commands to run manually (it does not perform them).

To work on a single package, `cd` into it and use its own scripts:

- `packages/babel-plugin-remove-react-element`: `npm run build` (babel `src` → `dist`), `npm test` (runs `babel-plugin-tester` fixtures via Jest).
- `packages/remove-react-element-test-project`: `npm run build` (webpack), `npm test` (runs the two bundle-content Jest assertions after an automatic rebuild).

## Testing the plugin itself

Plugin tests use `babel-plugin-tester` with fixture-based cases in `packages/babel-plugin-remove-react-element/__tests__/fixtures/`. Each fixture is a directory containing:

- `code.js` — input source
- `output.js` — expected transformed output
- optionally its own `.babelrc` to override presets/plugin options for that case

To add a new test case, add a new fixture directory following this pattern; `__tests__/tests.js` picks up all fixtures automatically. The default `pluginOptions` for fixtures (`elementNames: ["Desktop"]`) is set in `tests.js`.

## CI/CD

- `.github/workflows/continuous-integration.yml` runs on push/PR to `main`: `npm install`, `npm run build`, `npm run test` on Node 18.
- `.github/workflows/continuous-deployment.yml` runs on tags matching `v[0-9]+.[0-9]+.[0-9]+`: same build/test, then `npm publish --workspace babel-plugin-remove-react-element` using the `NPM_TOKEN` secret. Only the plugin package is published; the test project is not.
