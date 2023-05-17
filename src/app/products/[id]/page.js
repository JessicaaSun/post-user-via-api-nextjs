async function fetchProduct(id) {
  const resp = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
  return resp.json();
}

// call generateMetaData()
export async function generateMetadata({ params }) {
  const product = await fetchProduct(params.id);
  return {
    title: product.title,
    description: product.description,
    thumbnail: product.images[0],
    metadataBase: new URL("https://acme.com"),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en-US",
        "de-DE": "/de-DE",
      },
    },
    openGraph: {
      images: product.images[0],
      title: product.title,
      description: product.description
    },
  };
}

export default async function ProductDetail({ params }) {
  const { id } = params;
  const product = await fetchProduct(id);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between  text-3xl font-bold p-24">
      <h1 className="pb-10">Product Detail: {product.title}</h1>
      <img src={product.images[0]} alt={product.title} />
    </div>
  );
}
