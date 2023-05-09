import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "~/components/Loading";

const MyApp: NextPage = () => {
  const { status } = useSession({ required: false });
  const router = useRouter();

  if (status === "loading") return <Loading />;

  if (status === "authenticated") {
    void router.push("/taskManager");
  } else {
    return (
      <>
        <Head>
          <title>Task Manager App</title>
          <meta name="description" content="Get Your Life Together!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex h-screen items-center justify-center bg-gray-400 bg-cover">
          <div className="flex flex-col justify-center">
            <h2 className=" text-3xl font-bold text-gray-900">Task Manager</h2>
            <p className="px-5 text-lg text-gray-500">Get Your Life Together</p>

            <Link
              href="/taskManager"
              className="mx-auto flex justify-center border px-10 py-2"
              title="Enter"
            >
              Enter
            </Link>
          </div>
        </main>
      </>
    );
  }
  return <Loading />;
};

export default MyApp;
