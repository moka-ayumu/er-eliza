export async function getUserNum(nickname: string) {
  const res = await fetch(
    `https://open-api.bser.io/v1/user/nickname?query=${nickname}`,
    {
      headers: {
        accept: "application/json",
        "x-api-key": process.env.API_KEY as string,
      },
    }
  );
  return res.json().then((v) => v.user.userNum);
}

export async function getUserStats(
  userNum: number,
  seasonId: number
): Promise<IUserStat[]> {
  const res = await fetch(
    `https://open-api.bser.io/v1/user/stats/${userNum}/${seasonId}`,
    {
      headers: {
        accept: "application/json",
        "x-api-key": process.env.API_KEY as string,
      },
    }
  );
  return res.json().then((v) => v.userStats);
}

export async function getUserGames(
  userNum: number,
  next: string | undefined
): Promise<{ games: IGame[]; next: number }> {
  const res = await fetch(
    `https://open-api.bser.io/v1/user/games/${userNum}${
      next === undefined ? "" : `?next=${next}`
    }`,
    {
      headers: {
        accept: "application/json",
        "x-api-key": process.env.API_KEY as string,
      },
    }
  );
  const json = await res.json();
  return {
    games: json.userGames,
    next: json.next,
  };
}

export async function getGame(gameId: string): Promise<IGame[]> {
  const res = await fetch(`https://open-api.bser.io/v1/games/${gameId}`, {
    headers: {
      accept: "application/json",
      "x-api-key": process.env.API_KEY as string,
    },
  });
  return res.json().then((v) => v.userGames);
}
