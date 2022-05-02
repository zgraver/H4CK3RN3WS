import useSWR from "swr";
import Link from "next/link";
import { useState, useEffect } from "react";

const fetcher = (url, query = "", page = 0) =>
  fetch(`${url}?query=${query}&page=${page}`).then((res) => res.json());

// Has a search input field to query articles on the server using the "query" parameter
// A button to load more articles and append these at the bottom of the table.

const NewsList = ({ hidden = false }) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [aggregateData, setAggregateData] = useState([]);
  const { data, error } = useSWR(
    ["https://hn.algolia.com/api/v1/search", query, page],
    fetcher
  );
  useEffect(() => {
    setAggregateData(
      aggregateData
        .concat(data?.hits ?? [])
        .filter(
          (article) =>
            article.title !== null &&
            article.title !== "" &&
            article.title !== undefined
        )
    );
  }, [data]);
  return (
    <div className={hidden ? "hidden" : ""}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setAggregateData([]);
          setQuery(search);
          setPage(0);
        }}
      >
        <input
          type="text"
          value={search}
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <button type="button" onClick={(e) => setPage(page + 1)}>
        Load More
      </button>
      <div className={`news-list`}>
        {aggregateData.map(
          ({ objectID: id, title, url, author, num_comments }) => (
            <li className="news-item">
              <Link className="news-title" href={`/hackernews/${id}`}>
                <a>{title}</a>
              </Link>
            </li>
          )
        )}
      </div>
    </div>
  );
};

export default NewsList;
