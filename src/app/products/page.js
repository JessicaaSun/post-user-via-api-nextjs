import Link from "next/link";

// static metadata object
export const metadata = {
    title: 'ISTAD - Products',
    description: 'Listing all products',
  }

// create asynchronous function to getProducts
async function fetchProducts() {
  const response = await fetch(
    // similar to getServerSideProps
    "https://api.escuelajs.co/api/v1/products",
    {
        cache: "no-store"
    }
  );
  return response.json();
  // return data;
}

export default async function Products() {
  const products = await fetchProducts();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-3xl font-bold p-24">
      {products.map((product) => (
        <>
          <Link href={`/products/${product.id}`}><h2>{product.title}</h2></Link>
        </>
        
      ))}
    </main>
  );
}
