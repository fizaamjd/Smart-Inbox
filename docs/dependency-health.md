# Dependency health

Snapshot: 2026-10-19. npm audits contact the registry and report known dependency advisories; these are not an application penetration test. Full and production-only counts are shown separately. Compatible updates were applied without force upgrades.

| Component | Full audit | Production-only audit |
| --- | --- | --- |
| Smart-Inbox backend | 0 findings | 0 findings |
| Smart-Inbox frontend | 6 high, 5 moderate | 2 moderate |

The API audit is clear at this snapshot. The frontend retains two moderate production entries in its React Router chain, plus development findings in Tailwind/braces, PostCSS and Vite/esbuild. Proposed fixes require React Router, Tailwind and/or Vite major migrations; those need separate compatibility and browser checks. These results must not be described as a clean security audit.

Recheck with npm audit and npm audit --omit=dev in the relevant package directory. Do not use npm audit fix --force merely to obtain a zero count. Source-level access controls, secret storage, workflow permissions and data retention require their own review.
