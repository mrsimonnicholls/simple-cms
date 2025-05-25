fetch('/.netlify/functions/get-posts')
  .then(res => res.json())
  .then(posts => {
    const container = document.querySelector('#posts');
    
    posts.forEach(post => {
      const article = document.createElement('article');

      const date = new Date(post.created_at).toLocaleDateString('en-NZ', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      article.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <h6>Posted on ${post.created_at}</h6>
      `;

      container.appendChild(article);
    });
  });