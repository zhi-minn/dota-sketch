export type GameOptions = {
  categories: GameCategory[];
  drawingTime: number;
  rounds: number;
  maxPlayers: number;
  firstGuessDelay: number;
  reduceTimeWhenGuessed: boolean;
  allowWordReroll: boolean;
  public: boolean;
}