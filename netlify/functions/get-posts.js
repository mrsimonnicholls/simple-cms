const { supabase } = require('./_supabase');

exports.handler = async function () {
  const { data, error } = await supabase.from('posts').select('*');

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};