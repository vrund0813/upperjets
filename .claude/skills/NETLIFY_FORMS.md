# SKILL: Netlify Forms (SPA/Next.js Pattern)

## The Problem
Netlify's build bot only reads static HTML. Next.js pages are JavaScript-rendered,
so the bot never sees the React form. You MUST use the static file workaround.

## Step 1: Static detection file
Create `public/__forms.html` with field names matching the React form EXACTLY:

```html
<!DOCTYPE html>
<html>
<head></head>
<body>
  <form name="charter-quote" netlify netlify-honeypot="bot-field" hidden>
    <input type="hidden" name="form-name" value="charter-quote" />
    <input name="bot-field" type="text" />
    <input name="from" type="text" />
    <input name="to" type="text" />
    <input name="date" type="date" />
    <input name="type" type="text" />
    <input name="pax" type="number" />
    <input name="name" type="text" />
    <input name="contact" type="text" />
    <textarea name="notes"></textarea>
  </form>
</body>
</html>
```

## Step 2: React form — POST to /__forms.html
```tsx
const handleSubmit = async (data: FormData) => {
  const body = new URLSearchParams({
    'form-name': 'charter-quote',
    'bot-field': '',  // honeypot — leave empty
    ...Object.fromEntries(Object.entries(data).map(([k, v]) => [k, String(v)]))
  }).toString()

  await fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
}
```

## Step 3: React form markup
```tsx
<form
  name="charter-quote"
  onSubmit={handleSubmit}
>
  <input type="hidden" name="form-name" value="charter-quote" />
  {/* honeypot — visually hidden */}
  <div style={{ display: 'none' }}>
    <input name="bot-field" />
  </div>
  {/* ... form fields ... */}
</form>
```

## Critical Rules
- POST URL: `/__forms.html` — NOT `/`
- Content-Type: `application/x-www-form-urlencoded` — NOT `application/json`
- Body: `new URLSearchParams(formData).toString()`
- `form-name` field MUST be in the POST body

## netlify.toml
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "20"
```

## Email Notifications
After deploying: Netlify Dashboard → Forms → charter-quote → Notifications
Set up email notification to sales@upperjets.com
