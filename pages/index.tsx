import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import erLogo from "../public/asset/ER Logo White.png";

const Home: NextPage = () => {
  const router = useRouter();

  const searchNick = (nick: string) => {
    router.push(`/${nick}`);
  };

  const searchGame = (gameId: string) => {
    router.push(`/game/${gameId}`);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target: any = e.target;
    if (target[0].checked) {
      searchNick(target[2].value);
    } else {
      searchGame(target[2].value);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>ER:ELIZA</title>
      </Head>

      <main className={styles.main}>
        <form onSubmit={onSubmit}>
          <Image src={erLogo} objectFit="scale-down" />
          <div className={styles.radio}>
            <div>
              <input type="radio" name="type" id="nick" defaultChecked />
              <label htmlFor="nick">닉네임</label>
            </div>
            <div>
              <input type="radio" name="type" id="game" />
              <label htmlFor="game">게임ID</label>
            </div>
          </div>
          <input className={styles.search} type="text" />
        </form>
      </main>
    </div>
  );
};

export default Home;
