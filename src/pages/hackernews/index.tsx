import type { NextPage } from "next";
import Head from "next/head";
import NewsList from "../../components/newsList";

const HackerNewsPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>H4CK3RN3WS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NewsList />
    </div>
  );
};

export default HackerNewsPage;
