import Hero from "../components/Hero.jsx";
import FeaturedSlider from "../components/FeaturedSlider.jsx";
import TopProducts from "../components/TopProducts.jsx";
import Services from "../components/Services.jsx";
import "../styles/Home.css";

function Home() {
  return (
    <main className="home page">
      <Hero />
      <FeaturedSlider />
      <TopProducts />
      <Services />
    </main>
  );
}

export default Home;
