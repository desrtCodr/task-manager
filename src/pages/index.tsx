import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Home from "../components/Home";
import TaskManager from "../components/TaskManager";

const MyApp: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Task Manager App</title>
        <meta name="description" content="Get Your Life Together!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {sessionData ? <TaskManager /> : <Home />}
    </>
  );
};

export default MyApp;
