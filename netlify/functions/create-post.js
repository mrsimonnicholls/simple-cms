const { supabase } = require('./_supabase');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405 };
  }

  const { title, content } = JSON.parse(event.body);

  const { data, error } = await supabase.from('posts').insert([
    { title, content, author: 'Simon Nicholls' }
  ]);

  if (error) {
    return { statusCode: 500, body: error.message };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data[0])
  };
};