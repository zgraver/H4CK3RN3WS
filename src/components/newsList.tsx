import useSWR from "swr";
import Link from "next/link";
import { useState } from "react";

const fetcher = (url, queryParams = "") =>
  fetch(`${url}?query=${queryParams}`).then((res) => res.json());

// Has a search input field to query articles on the server using the "query" parameter

const NewsList = ({ hidden = false }) => {
  const [search, setSearch] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const { data, error } = useSWR(
    ["https://hn.algolia.com/api/v1/search", queryParams],
    fetcher
  );
  return (
    <div className={hidden ? "hidden" : ""}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQueryParams(search);
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
      <div className={`news-list`}>
        {data?.hits?.map(
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
