import useSWR from "swr";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../styles/NewsList.module.css";

const fetcher = (url, query = "", page = 0) =>
  fetch(`${url}?query=${query}&page=${page}`).then((res) => res.json());

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
    <div className={`${styles.container} ${hidden ? "hidden" : ""}`}>
      <div className={styles.inputs}>
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
      </div>
      <div className={styles.newsList}>
        {aggregateData.map(
          ({ objectID: id, title, url, author, num_comments }, index) => (
            <li className={styles.newsItem}>
              <Link href={`/hackernews/${id}`}>
                <a className={styles.link}>
                  <div className={styles.index}>{index}</div>
                  {title}
                </a>
              </Link>
              <div className={styles.subTitle}>
                <div className={styles.author}>author: {author}</div>
                <div className={styles.numComments}>
                  <Link href={`/hackernews/${id}`}>
                    <a className={styles.link}>{num_comments} comments</a>
                  </Link>
                </div>
              </div>
            </li>
          )
        )}
      </div>
    </div>
  );
};

export default NewsList;
