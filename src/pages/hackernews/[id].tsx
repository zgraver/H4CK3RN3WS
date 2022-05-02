import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/layout";

export default function Details({ details }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Head>
        <title>{details.title ?? id}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <pre>{JSON.stringify(details, null, 2)}</pre>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context?.query ?? {};
  const res = await fetch(`https://hn.algolia.com/api/v1/items/${id}`);
  const details = await res.json();

  if (!details) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      details,
    },
  };
}
