# Testing

```sh
npm ci --prefix backend
npm ci --prefix frontend
npm test --prefix backend
npm run build --prefix frontend
python3 scripts/check-docs.py
```

CI runs without production credentials or real account data. Its scope is limited to the checks named in the workflow, not end-to-end production validation. A passing workflow is not a security audit, retrieval benchmark, native extension runtime test, or service uptime guarantee.

Verification results and remaining lint/dependency findings are recorded in [verification](verification.md).
