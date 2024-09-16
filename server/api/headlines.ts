export default defineEventHandler(async (event) => {
  const apiKey = process.env.GNEWS_API_KEY;

  const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=technology&lang=ja&country=jp&apikey=${apiKey}`);
  const data = await response.json();

  if (response.ok) {
    return data.articles;
  } else {
    throw new Error('Failed to fetch headlines');
  }
});