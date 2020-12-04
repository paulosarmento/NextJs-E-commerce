import { GetServerSideProps } from "next";
import math from "../lib/math";
import { Title } from "../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
}
interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  async function handleSum() {
    const math = (await import("../lib/math")).default;

    alert(math.sum(3, 5));
  }

  return (
    <div>
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
  const response = await fetch("http://127.0.0.1:3333/recommended");
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    },
  };
};
