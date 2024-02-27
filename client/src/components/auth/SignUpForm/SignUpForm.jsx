// SignupForm.jsx
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

export default function SignUpForm({ handleSignup }) {
  const [error, setError] = useState('');

  const handleData = async (e) => {
    e.preventDefault();

    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value
    };

    try {
      await handleSignup(formData);
    } catch (error) {
      setError(error.message); // Set error message received from handleSignup function
    }
  };
  
  return (
    <section id="signup-page">
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
                Sign up for an account
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
                    id="password"
                    name="password"
                    color="secondary"
                    variant="bordered"
                  />
                  <Input
                    type="password"
                    placeholder="confirm password"
                    name="confirmPassword"
                    id="confirmPassword"
                    color="secondary"
                    variant="bordered"
                  />
                </section>
                <Button type='submit' color="secondary">Sign Up</Button>
              </form>
            </CardBody>
            <CardFooter className="text-sm flex justify-between gap-12">
              <section>
                <span className="pr-1">Already have an account?</span>
                <Link href="/login" className="text-sm">
                  Log In
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
