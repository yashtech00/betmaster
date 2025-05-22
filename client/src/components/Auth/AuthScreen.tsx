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

function Auth() {
  const id = useId();
  const [mode, setMode] = useState<"signup" | "signin">("signup");

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

        <form className="space-y-5">
          <div className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor={`${id}-name`}>Full name</Label>
                <Input
                  id={`${id}-name`}
                  placeholder="Matt Welsh"
                  type="text"
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
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-password`}>Password</Label>
              <Input
                id={`${id}-password`}
                placeholder="Enter your password"
                type="password"
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
                onClick={() => setMode("signin")}
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
                onClick={() => setMode("signup")}
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
