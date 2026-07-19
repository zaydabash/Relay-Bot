# Relay

**Discord safety analytics for moderators.**

Relay watches your server in real time, detects raids, spam, and destructive activity, and routes clear alerts to your mod team. Moderators stay in control — Relay detects and proposes; kick, ban, timeout, lockdown, and slowmode only run after a human approves them.

[Invite Relay](https://discord.com/oauth2/authorize?client_id=1070480873201340466&scope=bot%20applications.commands&permissions=1099511712950) · [[Privacy Policy](./privacy.html)](https://relayapp.xyz/privacy.html) · [[Terms of Service](./terms.html)](https://relayapp.xyz/terms.html)

---

## Why Relay

Most Discord “security” bots either spam vague alerts or auto-punish without context. Relay is built for the middle path:

- **Detection-first** — catch coordinated abuse early
- **Explainable alerts** — every flag includes *why* it fired
- **Human-approved actions** — no silent auto-bans
- **Privacy-conscious** — metadata and hashes, not full message storage or LLM scraping

---

## What it detects

| Detection | What it looks for |
|-----------|-------------------|
| **Raids** | Sudden join spikes, especially clusters of young accounts |
| **Message spam** | Fast message bursts from a single user |
| **Channel floods** | Too many messages in one channel in a short window |
| **Mention spam** | Mass mentions / `@everyone` / `@here` abuse |
| **Suspicious new members** | Young account, default avatar, raid-like username, aggressive first action |
| **Duplicate waves** | The same message pasted across channels by many accounts |
| **Link bursts** | Rapid link posting by a user or around one domain |
| **Invite spam** | Discord invite links posted as a spam pattern |
| **Nuke attempts** | Mass channel/role deletions or permission changes |

---

## How it works

Discord events → Relay bot → Detection API → Alerts + Review Queue → Mods approve → Bot executes


1. The bot listens to joins, messages, and structure changes.
2. The API scores activity with sliding-window rules (Redis + PostgreSQL).
3. Alerts post to your mod channel with reasons and a recommended action.
4. Optional **Review Queue** lets mods approve kick / ban / timeout / lockdown / slowmode.
5. An **Audit Log** records what was approved, rejected, or failed — and why.

---

## Quick start

1. **[Invite Relay](https://discord.com/oauth2/authorize?client_id=1070480873201340466&scope=bot%20applications.commands&permissions=1099511712950)** to your server  
   *(Needs Manage Server permission)*
2. In your server, run:
/setup /set-alert-channel #mod-alerts


3. Optionally open the dashboard to tune sensitivity, toggle detections, and enable the review queue.

That’s it — Relay starts watching immediately.

---

## Commands

| Command | Who | What it does |
|---------|-----|--------------|
| `/setup` | Admins | Register the server and create default settings |
| `/set-alert-channel` | Admins | Choose where alerts are posted |
| `/status` | Everyone | Bot online status, sensitivity, open alerts |
| `/config` | Everyone | Current detection toggles and action mode |
| `/alerts` | Everyone | Recent open alerts |
| `/help` | Everyone | Setup guide and privacy overview |

---

## Moderation actions (review queue)

When the review queue is enabled, Relay can propose:

| Action | Typical trigger |
|--------|-----------------|
| **Timeout** | High-risk spam, mentions, links, invite spam |
| **Kick** | High-risk suspicious new member |
| **Ban** | Critical user-targeted alerts |
| **Lockdown** | High-risk raid or nuke attempt |
| **Slowmode** | High-risk channel flood |

Nothing executes until a moderator approves it. Failures (missing permissions, role hierarchy) are recorded instead of failing silently.

---

## Permissions

Relay needs:

- View Channels, Read Message History, Send Messages, Embed Links  
- Kick Members, Ban Members, Moderate Members (timeout)  
- Manage Server, Manage Channels, View Audit Log  

**Permission integer:** `1099511712950`

If you invited an older version, re-invite with the link above so Discord grants the newer permissions.

---

## Privacy

Relay is designed for moderation signal, not surveillance:

- Stores IDs, timestamps, and message **hashes** — not full chat history
- Does not read DMs
- Does not use LLMs on your messages
- Server admins control alert routing and action mode

See the [./privacy.html ](http://relayapp.xyz/privacy.html) for details.

---

## Tech stack

Built as a production-style monorepo:

| Layer | Technology |
|-------|------------|
| Bot | discord.js |
| API | NestJS |
| Data | PostgreSQL (Prisma), Redis |
| Dashboard | Next.js, Discord OAuth |

---

## Project status

Relay is actively developed and dogfooded in real Discord servers. Core detection, slash commands, alert routing, review queue, and audit log are implemented.

Roadmap ideas: deeper analytics, premium retention tiers, and cross-server pattern signals (privacy-preserving).

---

## Links

- **Invite:** https://discord.com/oauth2/authorize?client_id=1070480873201340466&scope=bot%20applications.commands&permissions=1099511712950  
- **Privacy:** [./privacy.html ](http://relayapp.xyz/privacy.html) 
- **Terms:** [./terms.html](https://relayapp.xyz/terms.html)  
- **Contact:** relaybotsupport@gmail.com

---

*Relay is not affiliated with Discord Inc.*
