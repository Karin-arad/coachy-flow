# Make.com Quiz Recommendation Scenario

## Scenario 1: Quiz Recommendation

### Trigger: Webhook (Custom)
- Method: POST
- Parse JSON body

### Module 2: Notion — Search Objects
- Database: [Your Catalog DB ID]
- Filter: `active` = true
- Return all fields

### Module 3: Tools — Set Variable
Build the AI prompt. Combine:
- User answers from webhook body
- Catalog items from Notion query
- System instructions (see below)

### Module 4: OpenAI / Claude — Create Chat Completion
- Model: gpt-4o or claude-sonnet-4-20250514
- System prompt: (see AI Prompt below)
- User message: the variable from Module 3
- Response format: JSON

### Module 5: Webhook Response
- Status: 200
- Body: AI response JSON

## AI System Prompt

You are a sharp, human recommendation engine for a personal development website.

You receive:
1. A user's quiz answers (emotional state, desired mode, energy level, help type, avoidance pattern)
2. A catalog of available site destinations

Your job: choose the ONE best destination and ONE secondary option.

Rules:
- Choose ONLY from the provided catalog
- Never invent destinations that don't exist
- Adapt your tone to the user's energy:
  - Low energy → warm, gentle, empathetic
  - High energy → sharp, direct, energizing
  - Bored → playful, provocative
  - Emotionally tangled → honest but caring
- Write in the language specified (he/en)
- Use gender-neutral language (no masculine/feminine assumptions)
- The "description" field should be a sharp insight about the user — NOT a description of the tool
- The "reason" field should feel like a friend explaining why this is right
- Max 2 sentences each
- Return valid JSON matching this schema:

```json
{
  "primary": {
    "id": "catalog-item-id",
    "title": "Item title in user's language",
    "description": "Sharp insight about the user",
    "reason": "Why this is the right thing right now",
    "url": "/path/from/catalog",
    "type": "type-from-catalog"
  },
  "secondary": {
    "id": "catalog-item-id",
    "title": "Item title",
    "url": "/path/from/catalog",
    "type": "type-from-catalog"
  }
}
```

## Scenario 2: Email Capture

### Trigger: Webhook (Custom)
- Method: POST

### Module 2: Store email + answers
- Option A: Add to Notion "Leads" database
- Option B: Add to email marketing tool (Brevo/Mailchimp)

### Module 3: (Future) Trigger vibe analysis
- Will call site agents to generate personalized content
- Out of scope for v1
