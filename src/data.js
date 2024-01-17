export const fetchDummy = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts/1 ", {
    next: { revalidate: 3600 },
  });
  return posts.json();
};
