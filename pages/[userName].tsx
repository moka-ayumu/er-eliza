import type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Game from "../components/Game";
import Stat from "../components/Stat";
import * as er from "../lib/er";
import banner from "../public/asset/banner.png";
import styles from "../styles/userName.module.scss";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const UserName: NextPage<{
  userName: string;
  userNum: number;
  userStats: IUserStat[];
  userGames: IGame[];
  next: number;
}> = ({ userName, userNum, userStats, userGames, next }) => {
  console.log(userName, userNum, next);
  const router = useRouter();
  const [games, setGames] = useState<IGame[]>([]);
  useEffect(() => {
    setGames([...games, ...userGames]);
  }, [next]);
  const nextPage = () => {
    router.replace(
      {
        pathname: `${router.pathname}`,
        query: {
          ...router.query,
          next,
        },
      },
      router.asPath,
      {
        scroll: false,
      }
    );
  };
  return (
    <div>
      <Head>
        <title>ER:ELIZA - {userName} 통계</title>
      </Head>

      <main className={styles.main}>
        <SimpleBar style={{ height: "100vh" }}>
          <div className={styles.banner}>
            <div className={styles.bannerCon}>
              <h1>{userName}</h1>
              <div>
                {[1, 2, 3].map((matchingTeamMode) => {
                  const i = userStats.find(
                    (userStat) => userStat.matchingTeamMode === matchingTeamMode
                  );
                  return (
                    <Image
                      src={`/asset/RankTier/${
                        i !== undefined ? Math.trunc(i.mmr / 300) : 0
                      }.png`}
                      width={120}
                      height={100}
                      objectFit="scale-down"
                    />
                  );
                })}
              </div>
            </div>
            <Image src={banner} objectFit="cover" placeholder="blur" />
          </div>
          <div className={styles.content}>
            <div className={styles.seasonMenu}>
              {/* <p>일반</p>
              <p>랭크</p> */}
            </div>
            <div className={styles.stats}>
              <div className={styles.statsContent}>
                {userStats.map((userStat) => (
                  <Stat userStat={userStat} />
                ))}
              </div>
            </div>
            <SimpleBar>
              <div className={styles.games}>
                {games.map((userGame) => (
                  <Game
                    userGame={userGame}
                    onClick={() => {
                      router.push(`/game/${userGame.gameId}`);
                    }}
                  />
                ))}
                <div className={styles.moreGame} onClick={nextPage}>
                  <p>
                    <span>더</span>
                    <br />
                    보기
                  </p>
                </div>
              </div>
            </SimpleBar>
          </div>
          <div className={styles.background}>
            {/* <Image
            src="/asset/Nadja.png"
            width={1000}
            height={1000}
            objectFit="scale-down"
          /> */}
          </div>
        </SimpleBar>
      </main>
    </div>
  );
};

// export const getStaticProps: GetStaticProps = async (context) => {
//   // console.log(context);
//   const userName = context.params?.userName as string;
//   const next = context.params?.next as string | undefined;
//   const userNum = await er.getUserNum(userName);
//   let userGames = await er.getUserGames(userNum, next);
//   return {
//     props: {
//       userName,
//       userNum,
//       userGames: userGames.games,
//       next: userGames.next,
//       userStats: await er.getUserStats(userNum, 5),
//     },
//     revalidate: 10,
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   return { paths: [], fallback: "blocking" };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userName = context.query?.userName as string;
  const next = context.query?.next as string | undefined;
  const userNum = await er.getUserNum(userName);
  let userGames = await er.getUserGames(userNum, next);
  return {
    props: {
      userName,
      userNum,
      userGames: userGames.games,
      next: userGames.next,
      userStats: await er.getUserStats(userNum, 5),
    },
  };
};

export default UserName;
