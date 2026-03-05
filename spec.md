# RaistarBhai YouTube Landing Page

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Hero section with channel name "new.raistarbhai" prominently displayed
- Prominent "Subscribe" button linking to https://youtube.com/@new.raistarbhai?feature=shared
- "Watch Now" / "Visit Channel" button also linking to https://youtube.com/@new.raistarbhai?feature=shared
- Channel bio/description section with welcoming message encouraging visitors to subscribe
- Clickable channel URL display
- Call-to-action section encouraging users to subscribe and share the channel
- YouTube-themed red and white color scheme with modern design

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Generate a minimal Motoko backend (no complex state needed)
2. Build a single-page React frontend with:
   - Sticky header/nav with channel branding
   - Hero section: channel name, tagline, subscribe + watch buttons
   - About/bio section: welcoming description text
   - Visible clickable channel URL
   - Call-to-action section: encourage subscribe and share
   - Footer with channel link
3. Apply YouTube-inspired red (#FF0000) and white palette
4. Add deterministic data-ocid markers on all interactive elements
