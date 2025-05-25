document.querySelector('#post-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();

  const response = await fetch('/.netlify/functions/create-post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });

  const message = document.querySelector('#message');

  if (response.ok) {
    message.textContent = 'Post created!';
  } else {
    message.textContent = 'Something went wrong. Try again.';
  }

  e.target.reset();
});