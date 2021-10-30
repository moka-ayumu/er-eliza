interface IUserStat {
  seasonId: number;
  userNum: number;
  matchingMode: number;
  matchingTeamMode: number;
  mmr: number;
  nickname: string;
  rank: number;
  rankSize: number;
  totalGames: number;
  totalWins: number;
  totalTeamKills: number;
  rankPercent: number;
  averageRank: number;
  averageKills: number;
  averageAssistants: number;
  averageHunts: number;
  top1: number;
  top2: number;
  top3: number;
  top5: number;
  top7: number;
  characterStats: ICharacterStat[];
}

interface ICharacterStat {
  characterCode: number;
  totalGames: number;
  usages: number;
  maxKillings: number;
  top3: number;
  wins: number;
  top3Rate: number;
  averageRank: number;
}

interface IGame {
  userNum: number;
  nickname: string;
  gameId: number;
  seasonId: number;
  matchingMode: number;
  matchingTeamMode: number;
  characterNum: number;
  skinCode: number;
  characterLevel: number;
  gameRank: number;
  playerKill: number;
  playerAssistant: number;
  monsterKill: number;
  bestWeapon: number;
  bestWeaponLevel: number;
  masteryLevel: {
    (id: string): number;
  };
  equipment: IEquipment;
  versionMajor: number;
  versionMinor: number;
  language: string;
  skillLevelInfo: {
    (id: string): number;
  };
  skillOrderInfo: {
    (id: string): number;
  };
  serverName: string;
  maxHp: number;
  maxSp: number;
  attackPower: number;
  defense: number;
  hpRegen: number;
  spRegen: number;
  attackSpeed: number;
  moveSpeed: number;
  outOfCombatMoveSpeed: number;
  sightRange: number;
  attackRange: number;
  criticalStrikeChance: number;
  criticalStrikeDamage: number;
  coolDownReduction: number;
  lifeSteal: number;
  amplifierToMonster: number;
  trapDamage: number;
  bonusCoin: number;
  gainExp: number;
  baseExp: number;
  bonusExp: number;
  startDtm: string;
  duration: number;
  mmrBefore: number;
  mmrGain: number;
  mmrAfter: number;
  playTime: number;
  watchTime: number;
  totalTime: number;
  botAdded: number;
  botRemain: number;
  restrictedAreaAccelerated: number;
  safeAreas: number;
  teamNumber: number;
  preMade: number;
  eventMissionResult: {};
  gainedNormalMmrKFactor: number;
  victory: number;
  craftUncommon: number;
  craftRare: number;
  craftEpic: number;
  craftLegend: number;
  damageToPlayer: number;
  damageToPlayer_trap: number;
  damageToPlayer_basic: number;
  damageToPlayer_skill: number;
  damageToPlayer_itemSkill: number;
  damageToPlayer_direct: number;
  damageFromPlayer: number;
  damageFromPlayer_trap: number;
  damageFromPlayer_basic: number;
  damageFromPlayer_skill: number;
  damageFromPlayer_itemSkill: number;
  damageFromPlayer_direct: number;
  damageToMonster: number;
  damageToMonster_trap: number;
  damageToMonster_basic: number;
  damageToMonster_skill: number;
  damageToMonster_itemSkill: number;
  damageToMonster_direct: number;
  damageFromMonster: number;
  killMonsters: {
    (id: string): number;
  };
  healAmount: number;
  teamRecover: number;
  protectAbsorb: number;
  addSurveillanceCamera: number;
  addTelephotoCamera: number;
  removeSurveillanceCamera: number;
  removeTelephotoCamera: number;
  useHyperLoop: number;
  useSecurityConsole: number;
  giveUp: number;
  teamSpectator: number;
  routeIdOfStart: number;
  routeSlotId: number;
  placeOfStart: string;
  mmrAvg: number;
  teamKill: number;
  accountLevel: number;
  killerUserNum: number;
  killer: string;
  killDetail: string;
  causeOfDeath: string;
  placeOfDeath: string;
  killerCharacter: string;
  killerWeapon: string;
  killerUserNum2: number;
  killerUserNum3: number;
  fishingCount: number;
  useEmoticonCount: number;
}

interface IEquipment {
  "0": number;
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

interface IArea {
  areaNum: number;
  name: string;
  top: number;
  left: number;
  width: number;
  height: number;
  child: {
    class: string;
    color: Uint8ClampedArray;
  }[];
}
