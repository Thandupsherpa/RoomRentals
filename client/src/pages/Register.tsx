import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser, type User } from "@/contexts/userprovider";
import { DEV_TENANT } from "@/data/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    // TODO: Connect to an actual api
    console.log(formData);
    setUser(DEV_TENANT as User);
    navigate("/");
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-sm shadow-md">
          <CardHeader className="space-y-1 p-4">
            <CardTitle className="text-lg font-semibold">
              Register Now
            </CardTitle>
            <CardDescription className="text-xs">
              Create your account and browse rentals with ease.
            </CardDescription>

            <CardAction>
              <Button
                onClick={() => navigate("/login")}
                variant="link"
                className="text-xs p-0"
              >
                Login
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent className="p-2">
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                />
                <Input
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                />
              </div>

              <Input
                placeholder="Middle name (optional)"
                value={formData.middleName}
                onChange={(e) =>
                  setFormData({ ...formData, middleName: e.target.value })
                }
              />

              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />

              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />

              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TENANT">Tenant</SelectItem>
                  <SelectItem value="OWNER">Owner</SelectItem>
                </SelectContent>
              </Select>

              <Button type="submit" className="w-full h-9 text-sm">
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="hidden md:flex items-center justify-center bg-muted">
        <img
          src="/auth_image.png"
          alt="auth"
          className="max-w-md w-full object-contain"
        />
      </div>
    </div>
  );
}

export default Register;
