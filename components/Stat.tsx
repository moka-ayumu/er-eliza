import { GetServerSideProps, NextPage } from "next";
import styles from "./Stat.module.scss";
import Image from "next/image";

const Stat: NextPage<{
  userStat: IUserStat;
}> = ({ userStat }) => {
  const statType = ["솔로", "듀오", "스쿼드"];
  return (
    <div className={styles.stat}>
      <div className={styles.characterStats}>
        {userStat.characterStats.map((characterStat) => (
          <div className={styles.characterStat}>
            <Image
              src={`/asset/Character/${characterStat.characterCode}/Default/Half.png`}
              width={120}
              height={160}
              objectFit="scale-down"
            />
            {[
              ["픽률", characterStat.usages / userStat.totalGames],
              ["승률", characterStat.wins / characterStat.totalGames],
              ["IN 3", characterStat.top3 / characterStat.totalGames],
            ].map((v) => (
              <div>
                <svg width="10" height="140">
                  <line x1="5" y1="140" x2="5" y2="0" stroke="gray" />
                  <line
                    x1="5"
                    y1="140"
                    x2="5"
                    y2="0"
                    stroke="greenyellow"
                    strokeDashoffset={140 * (1 - (v[1] as number))}
                  />
                </svg>
                <p>{v[0]}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.roudStats}>
        {[
          ["상위", userStat.rankPercent],
          ["승률", userStat.top1],
          ["IN 3", userStat.top3],
        ].map((v) => (
          <div className={styles.roundPerc}>
            <svg width="100" height="100">
              <circle
                cx="50"
                cy="50"
                r="48"
                strokeDashoffset={301 * (1 - (v[1] as number))}
              />
            </svg>
            <p>
              {v[0]}
              <br />
              {Math.round((v[1] as number) * 100)}%
            </p>
          </div>
        ))}
      </div>
      <div className={styles.title}>
        <p>{statType[userStat.matchingTeamMode - 1]}</p>
        <ruby>
          {userStat.mmr}
          <rt>MMR</rt>
        </ruby>
      </div>
    </div>
  );
};

export default Stat;
