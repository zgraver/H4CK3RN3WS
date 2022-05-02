import useSWR from "swr";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

const NewsList = ({ hidden = false }) => {
  const { data, error } = useSWR(
    "https://hn.algolia.com/api/v1/search",
    fetcher
  );
  return (
    <div className={`news-list ${hidden ? "hidden" : ""}`}>
      {data?.hits?.map(({ objectID: id, title, url, author, num_comments }) => (
        <li className="news-item">
          <Link className="news-title" href={`/hackernews/${id}`}>
            <a>{title}</a>
          </Link>
        </li>
      ))}
    </div>
  );
};

export default NewsList;
