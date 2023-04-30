import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>Task Manager App</title>
        <meta name="description" content="Get Your Life Together!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        <header className="grid grid-cols-3 gap-10 bg-white shadow">
          <div className="ml-10 max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
            <p className="mt-1 text-lg text-gray-500">Get Your Life Together</p>
          </div>
          <div className="grid max-w-7xl items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
            <button className="rounded-full border px-5 py-3 font-semibold text-gray-500 no-underline transition hover:bg-white/20">
              Add Project
            </button>
          </div>
          <div className="mr-10 grid max-w-7xl grid-cols-2 items-center px-4 py-6 sm:px-6 lg:px-8">
            <p className="float-right text-lg text-gray-500">
              {sessionData && <span>Hello {sessionData.user?.name}</span>}
            </p>
            <button
              className="float-right rounded-full border px-5 py-3 font-semibold text-gray-500 no-underline transition hover:bg-white/20"
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              {sessionData ? "Sign out" : "Sign in"}
            </button>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="mb-2 text-lg font-medium text-gray-900">
                    Project 1
                  </h2>
                  <ul className="list-disc pl-5">
                    <li>Task 1</li>
                    <li>Task 2</li>
                    <li>Task 3</li>
                  </ul>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="mb-2 text-lg font-medium text-gray-900">
                    Project 2
                  </h2>
                  <ul className="list-disc pl-5">
                    <li>Task 1</li>
                    <li>Task 2</li>
                  </ul>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="mb-2 text-lg font-medium text-gray-900">
                    Project 3
                  </h2>
                  <ul className="list-disc pl-5">
                    <li>Task 1</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
