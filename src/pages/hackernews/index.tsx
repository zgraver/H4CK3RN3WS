import type { NextPage } from "next";
import Head from "next/head";

const HackerNewsPage: NextPage = ({ news }) => {
  return (
    <div>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="news-list">
        {news?.hits?.map(({ title, url, author, num_comments }) => (
          <li className="news-item">
            <a className="news-title" href="https://github.com/">
              {title}
            </a>
          </li>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://hn.algolia.com/api/v1/search");
  const news = await res.json();
  return {
    props: {
      news,
    },
  };
}

export default HackerNewsPage;
