import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

const NewsList = () => {
  const { data, error } = useSWR(
    "https://hn.algolia.com/api/v1/search",
    fetcher
  );
  return (
    <div className="news-list">
      {data?.hits?.map(({ title, url, author, num_comments }) => (
        <li className="news-item">
          <a className="news-title" href={url}>
            {title}
          </a>
        </li>
      ))}
    </div>
  );
};

export default NewsList;
