import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>chat.xyz</title>
        <meta name="description" content="An XYZ service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-full flex-col items-center justify-center bg-slate-800 text-[30rem] text-[60em] text-white">
        <p>XYZ</p>
      </main>
    </>
  );
}
