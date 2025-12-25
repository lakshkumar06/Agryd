Agryd is a contract management platform solving version control chaos in business contracts.

**Core Problem:** Companies lose 9% revenue to contract mismanagement - edits scattered across email/Slack/Docs, no source of truth for approvals, payment delays from approval ambiguity.

**Solution:** Git-style version control for contracts with blockchain escrow for payments.

**Product Phases:**
- v0: Version control + approval workflows (PostgreSQL, no blockchain)
- v1: Add Solana escrow for automatic payment release when approval threshold met

**Tech Stack:**
- Frontend: Next.js + Tailwind
- Backend: Supabase (PostgreSQL)
- Blockchain: Solana (escrow only, minimal on-chain footprint)
- Planned: AI contract analysis (Gemini), deadline extraction, risk flagging

**Current Status:** 
- Have README, architecture design, X account with existing followers
- Need to build: landing page + v0 MVP
- Disappeared for a month, planning comeback

**Key Design Decision:** Moving most features off-chain, only using blockchain for escrow where it provides unique value (trustless payment automation). Not "blockchain for blockchain's sake."

**Target Users:** B2B - legal teams, ops teams, finance teams dealing with vendor contracts, NDAs, employment agreements.