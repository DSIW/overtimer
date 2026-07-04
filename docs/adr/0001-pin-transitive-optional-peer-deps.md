# 1. Pin auto-resolved optional peer dependencies directly, not via `overrides`

Status: Accepted

Note: this repo otherwise uses `docs/adr/` for domain/business decisions
(see `docs/agents/domain.md`). This entry is a deliberate exception — the
failure mode it documents is subtle enough, and recurred silently for long
enough, that it's worth preserving the reasoning for future maintainers and
agents even though it's infra rather than domain.

## Context

Every open Dependabot PR started failing `npm ci` in CI with:

```
npm error Missing: yaml@2.9.0 from lock file
```

regardless of which unrelated package the PR actually bumped (mui, next,
prettier, recharts, typescript-eslint, sentry, eslint were all observed).
`main` itself was not broken — `npm ci` passed cleanly against it.

Root cause: `vitest` declares `yaml` as an *optional peerDependency*
(`^2.4.2`). npm auto-satisfies this with a nested
`node_modules/vitest/node_modules/yaml` entry, recorded in the lockfile as
`optional: true, peer: true`. Separately, `cosmiconfig` (pulled in via
`next-pwa` → `babel-loader` → `babel-plugin-macros`) requires
`yaml@^1.10.0`, resolved as an ordinary top-level `node_modules/yaml`.

Dependabot's own lockfile updater does not reliably preserve that
auto-resolved, flagged-optional-peer entry when regenerating the lock for
an unrelated bump — it silently drops it. `npm ci`'s strict tree-vs-lock
consistency check then fails, because vitest's peer requirement is still
declared but nothing in the lock satisfies it.

CI already had a self-heal for out-of-sync Dependabot lockfiles: on
install failure it commented `@dependabot recreate`. But since Dependabot
regenerates the lock the same buggy way every time, this looped forever —
every affected PR sat blocked indefinitely rather than being fixed by the
retry.

## Considered and rejected: `package.json` `overrides`

The obvious-looking fix is to pin the nested resolution via `overrides`:

```json
"overrides": { "vitest": { "yaml": "2.9.0" } }
```

This was tested in an isolated copy of the repo by regenerating the lock
from scratch with and without the override. The resulting
`node_modules/vitest/node_modules/yaml` entry was **byte-for-byte
identical** either way — same version, same `optional: true, peer: true`
flags. `overrides` only constrains *which version* npm picks when there's
a choice to make; it doesn't change *how* the dependency edge gets
recorded. The fragile "auto-resolved optional peer" shape — the actual
thing Dependabot's updater mishandles — is untouched. **`overrides` is a
no-op for this class of bug. Do not use it here.**

## Decision

Pin `yaml` as an explicit, direct `devDependency`:

```json
"yaml": "2.9.0"
```

(matching this repo's `.npmrc` `save-exact=true` convention). This makes
npm hoist a normal top-level `node_modules/yaml` entry with no
`optional`/`peer` flags at all — eliminating the fragile auto-resolved
node entirely. `cosmiconfig`'s separate `yaml@^1.10.0` need still gets its
own ordinary nested copy; the two versions coexist without conflict.

Verified: `npm ci`, `npx vitest run` (106 tests), `npx tsc --noEmit`,
`npx eslint .`, and `npm run build` all pass. A simulated Dependabot-style
bump (`npm install <pkg> --save-dev --save-exact --package-lock-only`,
mirroring exactly what the blocked PRs do) leaves the yaml entries stable
through a subsequent fresh `npm ci`.

Also updated `.github/workflows/ci.yml`'s recovery step to stop looping
forever: it now attempts `@dependabot recreate` once, and if `npm ci`
fails again after that, labels the PR `needs-triage` and stops instead of
retrying indefinitely.

## General principle for future recurrences

If Dependabot repeatedly fails to regenerate a lockfile for an otherwise
unrelated bump, suspect an auto-resolved optional/peer transitive
dependency getting dropped, not a real conflict with the bumped package.
Pin the transitive dependency directly as a `dependency`/`devDependency`
rather than reaching for `overrides` — `overrides` does not fix this
class of bug.
