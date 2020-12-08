import { GetServerSideProps } from "next";
import { Title } from "@/styles/pages/Home";
import SEO from "@/components/SEO";

interface IProduct {
  id: string;
  title: string;
}
interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  async function handleSum() {
    console.log(process.env.NEXT_PUBLIC_API_URL);

    const math = (await import("@/lib/math")).default;

    alert(math.sum(3, 5));
  }

  return (
    <div>
      <SEO
        title="DevCommerce, your best e-commerce!"
        image="boost.png"
        shouldExcludeTitleSuffix
      />
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map((recommendedProduct) => {
            return (
              <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
            );
          })}
        </ul>
      </section>
      <button onClick={handleSum}>Sum!</button>
    </div>
  );
}

//para informações que precisam ser indexadas pelos motores de busca... a tela toda aparece de uma vez!
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recommended`
  );
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    },
  };
};
