import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignUp
        forceRedirectUrl={process.env.NEXT_PUBLIC_BASE_URL}
        fallbackRedirectUrl={process.env.NEXT_PUBLIC_BASE_URL}
      />
    </main>
  );
};

export default SignUpPage;
