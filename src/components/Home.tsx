import React from "react";
import { type NextPage } from "next";
import { signIn } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <>
      <section className="flex h-screen items-center justify-center bg-gray-400 bg-cover">
        <div className="flex flex-col justify-center">
          <h2 className=" text-3xl font-bold text-gray-900">Task Manager</h2>
          <p className="px-5 text-lg text-gray-500">Get Your Life Together</p>
          <button className="m-5 border p-2" onClick={() => void signIn()}>
            Sign in
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
