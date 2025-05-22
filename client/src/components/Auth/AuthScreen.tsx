import { useState, useId } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useMutation } from "@tanstack/react-query";
import type { UserProp } from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Auth() {
  const id = useId();
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [formData, setFormData] = useState<UserProp>({
    fullname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // make sure to prefix with VITE_

  const { mutate: signupMutation } = useMutation<UserProp, unknown, UserProp>({
    mutationKey: ["signup"],
    mutationFn: async (formData) => {
      const res = await axios.post(`${BACKEND_URL}/user/signup`, formData, {
        withCredentials: true,
      });
      return res.data;
    },
     onSuccess: () => {
      navigate("/events")
    }
  });

  const { mutate: loginMutation } = useMutation<UserProp, unknown, UserProp>({
    mutationKey: ["login"],
    mutationFn: async (formData) => {
      const res = await axios.post(`${BACKEND_URL}/user/login`, formData, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      navigate("/events")
    }
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup") {
      signupMutation(formData);
    } else {
      const { email, password } = formData;
      loginMutation({ email, password } as UserProp);
    }
  };

  const switchMode = (newMode: "signup" | "signin") => {
    setMode(newMode);
    setFormData({
      fullname: "",
      email: "",
      password: "",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {mode === "signup" ? "Sign up" : "Sign in"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              {mode === "signup" ? "Sign up to BetMaster" : "Sign in to BetMaster"}
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              {mode === "signup"
                ? "We just need a few details to get you started."
                : "Welcome back! Please enter your credentials."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor={`${id}-name`}>Full name</Label>
                <Input
                  id={`${id}-name`}
                  placeholder="Matt Welsh"
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInput}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input
                id={`${id}-email`}
                placeholder="hi@yourcompany.com"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInput}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-password`}>Password</Label>
              <Input
                id={`${id}-password`}
                placeholder="Enter your password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInput}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            {mode === "signup" ? "Sign up" : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => switchMode("signin")}
                type="button"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => switchMode("signup")}
                type="button"
              >
                Sign up
              </button>
            </>
          )}
        </p>

        {mode === "signup" && (
          <p className="text-center text-xs text-muted-foreground">
            By signing up you agree to our{" "}
            <a className="underline hover:no-underline" href="#">
              Terms
            </a>
            .
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { Auth };
