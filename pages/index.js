export default function Index({ repos, updatedAt }) {
  return (
    <React.Fragment>
      <h1>
        You're running React on the Edge!
      </h1>
      <h2>Github public repositories. Updated at {updatedAt}</h2>
      <ul>
        {(repos || []).map((repo) => (
          <li><a href={repo.html_url} target="_blank" rel="noopener">{repo.full_name}</a></li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export async function getEdgeProps() {
  const response = await fetch('https://api.github.com/repositories', {
    headers: {'user-agent': 'flareact-app'}
  });
  const date = new Date();
  const repos = await response.json();

  return {
    props: {
      repos,
      updatedAt: date.toISOString(),
    },
    // Revalidate these props once every 60 seconds
    revalidate: 30,
  };
}