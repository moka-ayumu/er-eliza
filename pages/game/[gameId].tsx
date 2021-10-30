import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import * as er from "../../lib/er";
import styles from "../../styles/game.module.scss";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Game from "../../components/Game";
import * as util from "../../lib/util";

const GameId: NextPage<{
  gameId: string;
  userGames: IGame[];
}> = ({ gameId, userGames }) => {
  const router = useRouter();
  userGames.sort((a, b) => a.gameRank - b.gameRank);
  const prevPage = () => {
    router.back();
  };
  const reducerHighest = (type: string) => {
    return (prev: any, cur: any) => {
      const wei = prev[type] - cur[type];
      if (wei === 0) {
        if (prev["gameRank"] < cur["gameRank"]) return prev;
        else return cur;
      } else if (wei < 0) return cur;
      else return prev;
    };
  };
  const getDynamicType = (object: any, type: string) => {
    return object[type];
  };
  let areas: IArea[] = [
    {
      areaNum: 1,
      name: "항구",
      top: 740,
      left: -265,
      width: 90,
      height: 140,
      child: [],
    },
    {
      areaNum: 2,
      name: "연못",
      top: 605,
      left: 52,
      width: 170,
      height: 130,
      child: [],
    },
    {
      areaNum: 3,
      name: "모래사장",
      top: 423,
      left: -295,
      width: 85,
      height: 120,
      child: [],
    },
    {
      areaNum: 4,
      name: "고급주택가",
      top: 563,
      left: -290,
      width: 100,
      height: 155,
      child: [],
    },
    {
      areaNum: 5,
      name: "골목길",
      top: 280,
      left: 110,
      width: 130,
      height: 130,
      child: [],
    },
    {
      areaNum: 6,
      name: "호텔",
      top: 290,
      left: -190,
      width: 110,
      height: 175,
      child: [],
    },
    {
      areaNum: 7,
      name: "번화가",
      top: 430,
      left: 110,
      width: 110,
      height: 140,
      child: [],
    },
    {
      areaNum: 8,
      name: "병원",
      top: 765,
      left: 85,
      width: 130,
      height: 85,
      child: [],
    },
    {
      areaNum: 9,
      name: "절",
      top: 530,
      left: 260,
      width: 70,
      height: 190,
      child: [],
    },
    {
      areaNum: 10,
      name: "양궁장",
      top: 280,
      left: -60,
      width: 90,
      height: 75,
      child: [],
    },
    {
      areaNum: 11,
      name: "묘지",
      top: 640,
      left: -38,
      width: 70,
      height: 200,
      child: [],
    },
    {
      areaNum: 12,
      name: "숲",
      top: 485,
      left: -170,
      width: 80,
      height: 175,
      child: [],
    },
    {
      areaNum: 13,
      name: "공장",
      top: 850,
      left: -100,
      width: 160,
      height: 100,
      child: [],
    },
    {
      areaNum: 14,
      name: "성당",
      top: 675,
      left: -158,
      width: 80,
      height: 160,
      child: [],
    },
    {
      areaNum: 15,
      name: "학교",
      top: 370,
      left: -60,
      width: 150,
      height: 95,
      child: [],
    },
    {
      areaNum: 16,
      name: "연구소",
      top: 520,
      left: -60,
      width: 90,
      height: 100,
      child: [],
    },
  ];
  for (let i = 0; i < userGames.length; i++) {
    const userGame = userGames[i];
    if (userGame.placeOfDeath !== undefined) {
      const killPlace = Number(userGame.placeOfDeath);
      const killNum = userGame.killerUserNum;
      areas[killPlace - 1].child.push({
        class: `from-${killNum} to-${userGame.userNum}`,
        color: util.getRankColor(userGame.gameRank),
      });
    }
  }
  const gameMouseEnter = (e: any, userNum: number) => {
    console.log(userNum);
    const from = Array.from(
      document.getElementsByClassName(
        `from-${userNum}`
      ) as HTMLCollectionOf<HTMLElement>
    );
    for (let i = 0; i < from.length; i++) {
      const e = from[i];
      e.style.width = "15px";
      e.style.height = "15px";
      e.style.border = "2px solid white";
    }
    const to = Array.from(
      document.getElementsByClassName(
        `to-${userNum}`
      ) as HTMLCollectionOf<HTMLElement>
    );
    if (to.length > 0) {
      const e = to[0];
      e.style.backgroundColor = "red";
      e.style.width = "15px";
      e.style.height = "15px";
      e.style.border = "2px solid white";
    }
  };
  const gameMouseLeave = (e: any, userNum: number, gameRank: number) => {
    const from = Array.from(
      document.getElementsByClassName(
        `from-${userNum}`
      ) as HTMLCollectionOf<HTMLElement>
    );
    for (let i = 0; i < from.length; i++) {
      const e = from[i];
      e.style.width = "10px";
      e.style.height = "10px";
      e.style.border = "";
    }
    const to = Array.from(
      document.getElementsByClassName(
        `to-${userNum}`
      ) as HTMLCollectionOf<HTMLElement>
    );
    if (to.length > 0) {
      const color = util.getRankColor(gameRank);
      const e = to[0];
      e.style.backgroundColor = `rgb(${color[0]},${color[1]},${color[2]})`;
      e.style.width = "10px";
      e.style.height = "10px";
      e.style.border = "";
    }
  };
  return (
    <div>
      <Head>
        <title>ER:ELIZA - {gameId} 게임 정보</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.minimap}>
          <div className={styles.areas}>
            {areas.map((area) => (
              <div
                id={`area${area.areaNum}`}
                style={{
                  width: area.width,
                  height: area.height,
                  top: area.top,
                  left: area.left,
                }}
              >
                <div>
                  {area.child.map((v) => (
                    <div
                      className={v.class}
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: `rgb(${v.color[0]},${v.color[1]},${v.color[2]})`,
                        borderRadius: 999,
                        transition: "all 0.2s",
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Image
            src="/asset/minimap.png"
            width={820}
            height={820}
            objectFit="scale-down"
          />
        </div>
        <div className={styles.content}>
          <p className={styles.idTitle}>#{gameId}</p>
          <div className={styles.mostStats}>
            {[
              {
                title: "최다 킬",
                type: "playerKill",
                user: userGames.reduce(reducerHighest("playerKill")),
              },
              {
                title: "최다 피해",
                type: "damageToPlayer",
                user: userGames.reduce(reducerHighest("damageToPlayer")),
              },
              {
                title: "최다 감정",
                type: "useEmoticonCount",
                user: userGames.reduce(reducerHighest("useEmoticonCount")),
              },
            ].map((v) => (
              <div>
                <div className={styles.mostStatTitle}>
                  {v.title.split(" ").map((v) => (
                    <p>{v}</p>
                  ))}
                </div>
                <Image
                  src={`/asset/Character/${v.user.characterNum}/Default/Half.png`}
                  width={130}
                  height={160}
                  className={styles.mostStatImg}
                  objectFit="scale-down"
                />
                <div className={styles.mostStatDetail}>
                  <p className={styles.mostStatDetailData}>
                    {getDynamicType(v.user, v.type)}
                    <span>{v.title.split(" ")[1]}</span>
                  </p>
                  <p className={styles.mostStatDetailRank}>
                    #{v.user.gameRank}
                  </p>
                  <p>{v.user.nickname}</p>
                </div>
              </div>
            ))}
          </div>
          <SimpleBar>
            <div className={styles.userGames}>
              {userGames.map((userGame) => (
                <Game
                  userGame={userGame}
                  nickShow={true}
                  onMouseEnter={(e) => gameMouseEnter(e, userGame.userNum)}
                  onMouseLeave={(e) =>
                    gameMouseLeave(e, userGame.userNum, userGame.gameRank)
                  }
                />
              ))}
              {/* {userGames.map((userGame) => (
              <div className={styles.userGame}>
                <p>#{userGame.gameRank}</p>
                <Image
                  src={`/asset/Character/${userGame.characterNum}/Default/Mini.png`}
                  width={120}
                  height={100}
                  objectFit="scale-down"
                />
                <Equipment
                  equipment={userGame.equipment}
                  width={50}
                  height={30}
                />
                <div className={styles.detail}>
                  {[
                    { title: "킬", data: userGame.playerKill, max: 18 },
                    { title: "도움", data: userGame.playerAssistant, max: 18 },
                    {
                      title: "가한 피해량",
                      data: userGame.damageToPlayer,
                      max: 20000,
                    },
                    {
                      title: "받은 피해량",
                      data: userGame.damageFromPlayer,
                      max: 20000,
                    },
                  ].map((v) => (
                    <div>
                      <p>
                        {v.title} <span>{v.data}</span>
                      </p>
                      <svg width="140" height="5">
                        <line x1="3" y1="3" x2="137" y2="3" stroke="gray" />
                        <line
                          x1="3"
                          y1="3"
                          x2="137"
                          y2="3"
                          stroke="rosybrown"
                          strokeDashoffset={
                            134 * (1 - (v.data as number) / (v.max as number))
                          }
                        />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            ))} */}
            </div>
          </SimpleBar>
        </div>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  // console.log(context);
  const gameId = context.params?.gameId as string;
  let userGames = await er.getGame(gameId);
  return {
    props: {
      gameId,
      userGames,
    },
    revalidate: userGames.length < 18 ? 10 : false,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

//   export const getServerSideProps: GetServerSideProps = async (context) => {
//     const userName = context.query?.userName as string;
//     const next = context.query?.next as string | undefined;
//     const userNum = await er.getUserNum(userName);
//     let userGames = await er.getUserGames(userNum, next);
//     return {
//       props: {
//         userName,
//         userNum,
//         userGames: userGames.games,
//         next: userGames.next,
//         userStats: await er.getUserStats(userNum, 5),
//       },
//     };
//   };

export default GameId;
