import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";

const HackerNewsPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>H4CK3RN3WS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>{}</Layout>
    </div>
  );
};

export default HackerNewsPage;
