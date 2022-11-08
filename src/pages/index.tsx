import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { useCallback, useState } from "react";
import NavBar from "../components/NavBar";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [value, setValue] = useState("");
  const { data: list, refetch } = trpc.post.getAll.useQuery();
  const user = trpc.auth.getSession.useQuery();

  const test = trpc.post.unique.useQuery({ user: session?.user?.id! });

  // console.log(test.data?.blog);
  const insert = trpc.post.sendData.useMutation({
    onSuccess: () => refetch(),
  });

  const insertOne = useCallback(() => {
    if (value === "") return;

    insert.mutate({
      user: user.data?.user?.id!,
      text: value,
    });

    setValue("");
  }, [value, insert]);

  if (!session) {
    return (
      <div>
        <NavBar/>
		{/* <HomeScreen/>  */}
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <NavBar/>
        {/* <Sidebar/> */}
        {/* <MainView/> */}
      </main>

      {/* <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4"> */}
      {/*   <form onSubmit={insertOne}> */}
      {/*     <input */}
      {/*       type="text" */}
      {/*       onChange={(e) => setValue(e.target.value)} */}
      {/*       className="border " */}
      {/*       placeholder="Test" */}
      {/*     /> */}
      {/*     <input type="submit" value="Submit" /> */}
      {/*   </form> */}
      {/*   <button onClick={() => signOut()}>Out</button> */}
      {/*   <span>{user.data?.user?.name}</span> */}
      {/*   <span>{session.user?.id}</span> */}
      {/*  */}
      {/*   <div> */}
      {/*     {test.data?.blog.map((item, key) => ( */}
      {/*       <span key={key}>{item.post}</span> */}
      {/*     ))} */}
      {/*   </div> */}
      {/* </main> */}
    </>
  );
};

export default Home;
