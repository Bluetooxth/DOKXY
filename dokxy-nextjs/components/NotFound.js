import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center gap-2">
      <h1 className="text-4xl font-medium">Coming Soon</h1>
      <p className="text-xl font-normal">
        This page is under development. Please check back later.
      </p>
      <Link href="/">
        <p className="text-blue-500 hover:underline">Go back to home page</p>
      </Link>
    </div>
  );
};

export default NotFound;