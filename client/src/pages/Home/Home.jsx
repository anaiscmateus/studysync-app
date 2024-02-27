// Home.jsx
import BackgroundVideo from "../../components/home/BackgroundVideo/BackgroundVideo";
import Hero from "../../components/home/Hero/Hero";
import "./Home.css";

export default function Home() {
  return (
    <section id="landing-page">
      <BackgroundVideo />
      <Hero />
    </section>
  );
}
