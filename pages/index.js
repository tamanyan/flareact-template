export default function Index({ result, updatedAt }) {
  return (
    <React.Fragment>
      <h1>
        You're running React on the Edge!
      </h1>
      <h2>Github public repositories. Updated at {updatedAt}</h2>
      <ul>
        {(result.items || []).map((repo) => (
          <li><a href={repo.html_url} target="_blank" rel="noopener">{repo.full_name}</a></li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export async function getEdgeProps() {
  const response = await fetch('https://api.github.com/search/repositories?q=javascript&sort=updated', {
    headers: {'user-agent': 'flareact-app'}
  });
  const date = new Date();
  const result = await response.json();

  return {
    props: {
      result,
      updatedAt: date.toISOString(),
    },
    // Revalidate these props once every 30 seconds
    revalidate: 30,
  };
}