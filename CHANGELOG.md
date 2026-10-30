# Changelog

## [1.4.1](https://github.com/DSIW/overtimer/compare/overtimer-v1.4.0...overtimer-v1.4.1) (2026-10-30)


### Bug Fixes

* bound a quarter time range to the end of the quarter ([#1388](https://github.com/DSIW/overtimer/issues/1388)) ([e7765f0](https://github.com/DSIW/overtimer/commit/e7765f0e25944f8d622ff0216f15e196c03fa557))
* compute weekday medians correctly ([#1382](https://github.com/DSIW/overtimer/issues/1382)) ([3caf78f](https://github.com/DSIW/overtimer/commit/3caf78f5b7669c1e744c42c46cd521d1c81b27d7))
* count only today's running time log towards today's worked time ([#1387](https://github.com/DSIW/overtimer/issues/1387)) ([8d92380](https://github.com/DSIW/overtimer/commit/8d923809891e74f41472c4dc3d532861d3a1a270))
* discard a time log that is stopped within the second it was started ([#1385](https://github.com/DSIW/overtimer/issues/1385)) ([1a35a0a](https://github.com/DSIW/overtimer/commit/1a35a0a489c9fbc388f2e1d43b8b50daca605fb0))
* do not save the edit dialog while it shows an error ([#1380](https://github.com/DSIW/overtimer/issues/1380)) ([f494409](https://github.com/DSIW/overtimer/commit/f49440961839ffe5907f5b69b143def6b24896d7))
* end a time log forgotten over midnight at the end of its day ([#1386](https://github.com/DSIW/overtimer/issues/1386)) ([6dcab12](https://github.com/DSIW/overtimer/commit/6dcab129f6d9a90adb5477ef8a4e6c638ffc88ab))
* hide the persistence warning until storage is known to be non-persistent ([#1381](https://github.com/DSIW/overtimer/issues/1381)) ([a6b40e7](https://github.com/DSIW/overtimer/commit/a6b40e700b997726c81068403fd8e119042a8362))
* keep the selected analysis year when time logs change ([#1384](https://github.com/DSIW/overtimer/issues/1384)) ([07f0320](https://github.com/DSIW/overtimer/commit/07f0320751f37410398dec113215d5184e55b2f4))
* make backup import atomic and reject duplicate start times ([#1378](https://github.com/DSIW/overtimer/issues/1378)) ([8065ca7](https://github.com/DSIW/overtimer/commit/8065ca740a29d978bfbea348bb35c4dca9e14eb2))
* show the week overtime card whenever this week has overtime ([#1383](https://github.com/DSIW/overtimer/issues/1383)) ([42c56d4](https://github.com/DSIW/overtimer/commit/42c56d42b78e6cfae672846c70180a0be12aaa0f))

## [1.4.0](https://github.com/DSIW/overtimer/compare/overtimer-v1.3.1...overtimer-v1.4.0) (2026-10-12)


### Features

* **timer:** show pause length while timer is stopped ([#1348](https://github.com/DSIW/overtimer/issues/1348)) ([2e7c0bb](https://github.com/DSIW/overtimer/commit/2e7c0bbc77e0b834d83f26c7bb9510adae736228))

## [1.3.1](https://github.com/DSIW/overtimer/compare/overtimer-v1.3.0...overtimer-v1.3.1) (2026-07-31)


### Bug Fixes

* show negative overtime as a red negative number instead of 0 ([#1309](https://github.com/DSIW/overtimer/issues/1309)) ([113a52a](https://github.com/DSIW/overtimer/commit/113a52a90aa99e1911e0a9fbcc6ba5184867156a))

## [1.3.0](https://github.com/DSIW/overtimer/compare/overtimer-v1.2.1...overtimer-v1.3.0) (2026-07-31)


### Features

* add configurable time range for time log table ([#1307](https://github.com/DSIW/overtimer/issues/1307)) ([1bff674](https://github.com/DSIW/overtimer/commit/1bff674ca7a6a411e65de11199afc599bfd5ff88))

## [1.2.1](https://github.com/DSIW/overtimer/compare/overtimer-v1.2.0...overtimer-v1.2.1) (2026-07-04)


### Bug Fixes

* pin yaml devDependency to stop Dependabot lockfile-drift loop ([#1279](https://github.com/DSIW/overtimer/issues/1279)) ([09ecad1](https://github.com/DSIW/overtimer/commit/09ecad16e58b390da83449677646583b6c777a37))

## [1.2.0](https://github.com/DSIW/overtimer/compare/overtimer-v1.1.2...overtimer-v1.2.0) (2026-06-25)


### Features

* make total overtime card visually clickable ([#1259](https://github.com/DSIW/overtimer/issues/1259)) ([7ee7479](https://github.com/DSIW/overtimer/commit/7ee7479a93409b00b2955ece8226c92291c498e8))

## [1.1.2](https://github.com/DSIW/overtimer/compare/overtimer-v1.1.1...overtimer-v1.1.2) (2026-06-24)


### Bug Fixes

* **ci:** grep deploy URL from vercel output instead of tail -1 ([#1257](https://github.com/DSIW/overtimer/issues/1257)) ([78b0c99](https://github.com/DSIW/overtimer/commit/78b0c997ea58a64912b01e9dabb9471a48568d7e))

## [1.1.1](https://github.com/DSIW/overtimer/compare/overtimer-v1.1.0...overtimer-v1.1.1) (2026-06-23)


### Bug Fixes

* **ci:** use PAT for release-please so release events trigger deploy ([#1249](https://github.com/DSIW/overtimer/issues/1249)) ([fbb1973](https://github.com/DSIW/overtimer/commit/fbb1973fd4d09d4a731a316cfa1ea384dabadf8b))

## [1.1.0](https://github.com/DSIW/overtimer/compare/overtimer-v1.0.1...overtimer-v1.1.0) (2026-06-22)


### Features

* make time log week filter configurable via select box ([#1246](https://github.com/DSIW/overtimer/issues/1246)) ([8070adf](https://github.com/DSIW/overtimer/commit/8070adf7b7c9665410a00045aa3d30012c5498d4))

## [1.0.1](https://github.com/DSIW/overtimer/compare/overtimer-v1.0.0...overtimer-v1.0.1) (2026-06-21)


### Bug Fixes

* import SelectChangeEvent from public @mui/material/Select entrypoint ([#1231](https://github.com/DSIW/overtimer/issues/1231)) ([4b1c201](https://github.com/DSIW/overtimer/commit/4b1c2017575489f791efe7419a95ffa7eff8376b))

## [1.0.0](https://github.com/DSIW/overtimer/compare/overtimer-v0.1.0...overtimer-v1.0.0) (2026-03-28)

### Bug Fixes

- **ci:** migrate to eslint flat config for Next.js 16 compatibility ([bdd0336](https://github.com/DSIW/overtimer/commit/bdd033661644197f7ba9b3ebc4aaf2acb82cb9d4))
