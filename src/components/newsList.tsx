import useSWR from "swr";
import Link from "next/link";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

// Has a search input field to query articles on the server using the "query" parameter

const NewsList = ({ hidden = false }) => {
  const { data, error } = useSWR(
    "https://hn.algolia.com/api/v1/search",
    fetcher
  );
  const [search, setSearch] = useState("");
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={search}
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className={`news-list ${hidden ? "hidden" : ""}`}>
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
    </>
  );
};

export default NewsList;
