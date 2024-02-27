// Hero.jsx
import { Button, Link, Card } from "@nextui-org/react";
const Hero = () => {
  return (
    <div className="p-6 absolute inset-0 grid items-center justify-center text-white">
      <Card className="bg-opacity-80">
        <section id="hero" className="p-6 grid gap-8 text-center">
          <section
            id="title"
            className="flex gap-2 items-center justify-center"
          >
            <img src="assets/icons/sync.png" />
            <h1 className="text-7xl drop-shadow-2xl">StudySync</h1>
          </section>
          <section id="cta">
            <p className="font-semibold text-center text-2xl">
              Join the learning revolution today.
            </p>
          </section>
          <section id="btns" className="grid grid-cols-2 gap-8">
            <Button
              as={Link}
              className="font-semibold text-xl"
              size="lg"
              href="/login"
              color="warning"
            >
              Log In
            </Button>
            <Button
              as={Link}
              className="font-semibold text-xl"
              color="secondary"
              size="lg"
              href="/signup"
            >
              Sign Up
            </Button>
          </section>
        </section>
      </Card>
    </div>
  );
};

export default Hero;
