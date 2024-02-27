// LoginForm.jsx
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Divider,
  Link,
} from "@nextui-org/react";
import ArrowIcon from "../../../assets/icons/ArrowIcon";

export default function LogInForm({ handleLogin }) {
  const [error, setError] = useState('');

  const handleData = async (e) => {
    e.preventDefault();

    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    try {
      await handleLogin(formData);
    } catch (error) {
      setError(error.message); // Set error message received from handleLogin function
    }
  };

  return (
    <section id="login-page">
      <div className="min-h-screen flex flex-col gap-4 justify-center items-center p-6">
        <section className="max-w-5xl px-6 grid text-center gap-4">
          <section
            id="title"
            className="flex gap-2 items-center justify-center"
          >
            <img src="assets/icons/sync.png" />
            <h1 className="text-6xl drop-shadow-2xl">StudySync</h1>
          </section>
          <Card className="border border-zinc-400">
            <CardHeader>
              <div className="text-xl font-semibold">
                Log in to your account
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
              <form className="grid gap-5" method="POST" onSubmit={handleData}>
                <section className="grid gap-3">
                  <Input
                    type="text"
                    placeholder="username"
                    name="username"
                    id="username"
                    color="secondary"
                    variant="bordered"
                  />
                  <Input
                    type="password"
                    placeholder="password"
                    name="password"
                    id="password"
                    color="secondary"
                    variant="bordered"
                  />
                </section>
                <Button type='submit' color="secondary">Log In</Button>
              </form>
            </CardBody>
            <CardFooter className="text-sm flex justify-between gap-12">
              <section>
                <span className="pr-1">Don&apos;t have an account?</span>
                <Link href="/signup" className="text-sm">
                  Sign Up
                </Link>
              </section>
              <Link className="text-sm flex items-center" href="/">
                <ArrowIcon />
                Back Home
              </Link>
            </CardFooter>
          </Card>
        </section>
      </div>
    </section>
  );
}
