// Home.jsx
import BackgroundVideo from "./components/BackgroundVideo/BackgroundVideo";
import Hero from "./components/Hero/Hero";
import "./Home.css";

export default function Home() {
  return (
    <section id="landing-page">
      <BackgroundVideo />
      <Hero />
    </section>
  );
}
