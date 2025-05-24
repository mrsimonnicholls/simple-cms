const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_KEY;

const fetchPosts = async () => {
  const response = await fetch(`${supabaseUrl}/rest/v1/posts?select=*`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`
    }
  });

  const posts = await response.json();

  const container = document.querySelector('#posts');
  container.innerHTML = ''; // clear any existing content

  posts.forEach(post => {
    const article = document.createElement('article');
    article.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      <small>Posted on ${new Date(post.created_at).toLocaleString()}</small>
    `;
    container.appendChild(article);
  });
};

fetchPosts();