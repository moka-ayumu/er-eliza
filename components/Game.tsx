import { NextPage } from "next";
import styles from "./Game.module.scss";
import Image from "next/image";
import Equipment from "./Equipment";
import { MouseEventHandler } from "react";
import * as util from "../lib/util";

const Game: NextPage<{
  userGame: IGame;
  nickShow?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}> = ({ userGame, onClick, nickShow = false, onMouseEnter, onMouseLeave }) => {
  const date = new Date(userGame.startDtm);
  const rankColor = util.getRankColor(userGame.gameRank);
  const fillZero = (inp: number) => {
    return inp.toLocaleString(undefined, {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };
  return (
    <div
      className={styles.game}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.rank}>
        <svg width="50" height="50">
          <polygon
            points="0 0, 50 0, 0 50"
            fill={`rgb(${rankColor[0]},${rankColor[1]},${rankColor[2]})`}
          />
        </svg>
        <p>{userGame.gameRank}</p>
      </div>
      <Image
        src={`/asset/Character/${userGame.characterNum}/Default/Half.png`}
        className={styles.character}
        width={150}
        height={200}
        objectFit="scale-down"
      />
      <div className={styles.content}>
        {/* <p>
          {`${date.getFullYear()}.${fillZero(date.getMonth())}.${fillZero(
            date.getDate()
          )}`}{" "}
          <br /> {`${fillZero(date.getHours())}:${fillZero(date.getMinutes())}`}
        </p> */}
        {nickShow ? <p>{userGame.nickname}</p> : ""}
        <Equipment equipment={userGame.equipment} width={150} height={100} />
        <p className={styles.title}>MMR</p>
        <p className={styles.mmr}>
          <span>
            {userGame.mmrGain < 0 ? "" : "+"}
            {userGame.mmrGain}
          </span>
          {userGame.mmrAfter}
        </p>
        {[
          ["킬", userGame.playerKill, 18],
          ["도움", userGame.playerAssistant, 18],
          ["가한 피해량", userGame.damageToPlayer, 20000],
          ["받은 피해량", userGame.damageFromPlayer, 20000],
          ["회복량", userGame.healAmount, 20000],
        ].map((v) => (
          <div className={styles.detail}>
            <p className={styles.title}>
              {v[0]}
              <p>{v[1]}</p>
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
                  134 * (1 - (v[1] as number) / (v[2] as number))
                }
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
