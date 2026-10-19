# Security policy

## Reporting

Use [GitHub private reporting](https://github.com/fizaamjd/Smart-Inbox/security/advisories/new). Include the affected branch/commit, reproduction with synthetic data, impact and suggested mitigation. Do not post credentials, customer data, private repository contents, or real email in an issue. If a credential was exposed, revoke it through its provider; removing a file does not invalidate a token or erase earlier commits.

The maintained branch is `main`; there is no separate security support promise for old phase branches or tags. Dependency updates and CI checks do not establish a completed security audit.

## Known boundaries

- JWT_SECRET and CRED_SECRET have development fallbacks. Set independent strong production values; changing CRED_SECRET can make existing encrypted OAuth credentials unreadable.
- The /api/emails ingest route uses an ingest token when supplied but retains a legacy account fallback. Review this path before public ingestion. A demo account is public and unsuitable for private mail.
- OAuth credentials, refresh tokens, model prompts and message contents are sensitive. Gmail/Discord/Sheets/n8n operations require explicit accounts and permissions; synthetic demo fixtures are not real mailbox evidence.
- Encryption and classifier unit tests do not prove OAuth, tenant isolation, delivery reliability or production hardening.

Use dedicated development services and explicit secrets. Review provider permissions, public network exposure, data retention, and deployment access before using private data. No penetration test or production-readiness certification is claimed.
