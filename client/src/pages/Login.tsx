import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser, type User } from "@/contexts/userprovider";
import { DEV_TENANT } from "@/data/user";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    // TODO: Connect to an actual api
    console.log(email, password);
    setUser(DEV_TENANT as User);
    navigate("/");
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 gap-4">
        <Card className="w-full max-w-sm shadow-lg">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Welcome back
              </CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
              <CardAction>
                <Button onClick={() => navigate("/register")} variant="link">
                  Sign Up
                </Button>
              </CardAction>
            </CardHeader>

            <CardContent className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="#"
                    onClick={() => alert("Not implemented yet!")}
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Input
                  id="password"
                  type="password"
                  className="mb-6"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      <div className="hidden md:flex items-center justify-center bg-muted p-6">
        <img
          src="/auth_image.png"
          alt="auth"
          className="max-w-xl w-full object-contain"
        />
      </div>
    </div>
  );
}

export default Login;
