# Architecture

Gmail is accessed by the configured OAuth/n8n integration. The n8n workflow can classify/enrich, route to external destinations, and ingest into Express; the simulator invokes application classification without Gmail. MongoDB stores users, settings, messages and integration records. The frontend reads authenticated API endpoints.

backend/src/crypto.js encrypts stored secrets with AES-256-GCM and a key derived from CRED_SECRET. This does not replace access control. Preserve the key when migrating existing encrypted records. Classification may fall back to keywords and should not be treated as a guaranteed model decision. The imported workflow and API simulator are separate execution paths.
