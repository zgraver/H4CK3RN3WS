import Layout from "../../components/layout";

export default function Details({ details }) {
  return <Layout>{details.id}</Layout>;
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
