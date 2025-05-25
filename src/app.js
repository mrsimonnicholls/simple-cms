fetch('/.netlify/functions/get-posts')
  .then(res => res.json())
  .then(posts => {
    const container = document.querySelector('#posts');
    container.innerHTML = '';
    posts.forEach(post => {
      const article = document.createElement('article');
      article.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
      container.appendChild(article);
    });
  });