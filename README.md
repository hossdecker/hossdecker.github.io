# SYNcopated Security

Personal site, built with Jekyll and served by GitHub Pages at hossdecker.com. Tagline: *Zero trust. Full volume.*

## Adding things

- **A post:** add a Markdown file to `_posts/` named `YYYY-MM-DD-title.md` with `title` and (optionally) `lede` in the front matter. Reading time shows as a tempo automatically.
- **A project:** add a Markdown file to `_projects/`. Copy an existing one. `order` controls which two appear on the homepage.
- **A talk or media item:** add an entry to `_data/talks.yml`.
- **Contact address:** stored base64-encoded in `_config.yml` as `contact_b64`. To change it: `printf 'new@address.com' | base64`.
- **YouTube link:** set `youtube_url` in `_config.yml` and it appears in the footer.

## Light and dark

The site follows the visitor's device setting and the volume knob in the header turns to match. Clicking the knob overrides it; matching the device again clears the override. Colors live as variables at the top of `assets/css/main.css`.

## Custom domain

The `CNAME` file points the site at hossdecker.com. Leave it in place.
