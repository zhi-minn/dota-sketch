export type WsMessageType =
  | "LOBBY_SETTINGS"
  | "DRAW_EVENT"
  | "WORD_GUESS";

export interface WsMessage<T = unknown> {
  type: WsMessageType;
  payload: T;
};

export function isWsMessage(data: any): data is WsMessage {
  return typeof data === "object" && "type" in data && "payload" in data;
};