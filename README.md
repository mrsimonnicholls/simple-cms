
# Simple Supabase CMS

A minimal content management system using:
- HTML + CSS + Vanilla JS
- Supabase (for database)
- Netlify Functions (for secure backend)

---

## Folder Structure

```
simple-cms/
├── index.html              # Your main webpage
├── src/
│   ├── style.css           # Your styles (JetBrains Mono)
│   └── app.js              # Frontend logic to fetch/display posts
├── netlify/
│   └── functions/
│       └── get-posts.js    # Secure serverless function (read posts)
├── .env                    # Environment variables (not committed)
├── .gitignore              # Ignores node_modules and .env
├── package.json            # Lists supabase-js dependency
└── netlify.toml            # Tells Netlify where your functions live
```

---

## Setup Instructions

### 1. Install Node modules

```bash
npm install
```

This only installs `@supabase/supabase-js` for the function backend.

---

### 2. Create a `.env` file

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
```

- Keep this file private
- Do **not** use the service key on the frontend!

---

### 3. Run the project locally

```bash
npx netlify dev
```

- Serves your `index.html`
- Runs backend functions
- Injects `.env` automatically

---

## 🧠 Advanced: Add a POST endpoint

### Create `netlify/functions/create-post.js`

```js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

exports.handler = async function (event) {
  const { title, content } = JSON.parse(event.body);

  const { data, error } = await supabase.from('posts').insert([{ title, content }]);

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data[0]),
  };
};
```

### Usage (in JavaScript)

```js
fetch('/.netlify/functions/create-post', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'New Post', content: 'This is from JS!' })
});
```

---

## 🚀 Deploy

1. Push to GitHub
2. Connect to Netlify
3. Add environment variables in the **Netlify dashboard**
4. Done!

---

**Created for learning. Keep the backend minimal, safe, and easy to scale.**
