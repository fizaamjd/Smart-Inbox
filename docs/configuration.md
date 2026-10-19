# Configuration

Copy backend/.env.example to backend/.env. Configure MONGODB_URI/MONGODB_DB for a disposable development database and set strong, independent JWT_SECRET and CRED_SECRET. GROQ_API_KEY is optional: the classifier uses keywords without it. FRONTEND_URL and BACKEND_URL determine OAuth redirects. N8N_API_URL/N8N_API_KEY enable per-user workflow provisioning.

DEMO_EMAIL/DEMO_PASSWORD and INGEST_EMAIL are demonstration/legacy settings. Do not seed a production database or store private mail under the shared demo account. The legacy ingest route can accept messages without the per-user token; review it before exposing the API.

The frontend uses /api; development uses the Vite proxy and production uses the committed deployment/proxy configuration. Real Gmail, Discord and Sheets need your own OAuth scopes, credential bindings and destinations. Inspect imported n8n workflows before activation. Changing CRED_SECRET without a credential migration breaks decryption of stored tokens.
