import {LobbyHeader} from "@/components/LobbyHeader/LobbyHeader";
import { Box, Grid } from '@mantine/core';
import {Canvas} from "@/components/Canvas/Canvas";
import { EnterNickname } from '@/components/EnterNickname/EnterNickname';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { isWsMessage, WsMessage } from '@/types/websocket';
import { LobbySettings } from '@/types/lobbySettings';
import LobbyInfoPanel from '@/components/LobbyInfoPanel/LobbyInfoPanel';

export function LobbyPage() {
  const { code } = useParams();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [lobbySettings, setLobbySettings] = useState<LobbySettings>();

  const handleNicknameEntered = (nickname: string) => {
    connectToWebsocket();
  }

  const connectToWebsocket = () => {
    const ws = new WebSocket(`ws://localhost:8081/ws?lobbyCode=${code}`);

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      handleMessageEvent(event);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(ws);
  }

  const handleMessageEvent = (event: MessageEvent) => {
    const data: WsMessage = JSON.parse(event.data);

    if (!isWsMessage(data)) {
      console.error("Invalid WebSocket message format: ", data);
      return;
    }

    switch (data.type) {
      case "LOBBY_SETTINGS":
        setLobbySettings(data.payload as LobbySettings);
    }
  }

  return (
    <>
      <EnterNickname onNicknameEntered={handleNicknameEntered} />
      {lobbySettings &&
        <>
      <LobbyHeader />
      <Grid grow style={{paddingTop: "0.5em"}}>
        {/* Left panel: Lobby info */}
        <Grid.Col span={3}>
          <LobbyInfoPanel lobbySettings={lobbySettings} />
        </Grid.Col>

        {/* Center panel: drawing canvas + color palette */}
        <Grid.Col span={6}>
          <Box style={{
            height: "calc(100% - 50px)",
            border: "2px solid black",
            boxSizing: "border-box",
            borderRadius: "8px",
            overflow: "hidden",
          }}>
            <Canvas />
          </Box>

          <Box
            style={{
              height: "50px",
              backgroundColor: "#f1f1f1",
              boxSizing: "border-box",
              marginTop: "0.5em",
            }}
          >
            {/* Replace this with your palette component */}
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", height: "100%" }}>
              <div style={{ width: "20px", height: "20px", backgroundColor: "red", borderRadius: "50%" }} />
              <div style={{ width: "20px", height: "20px", backgroundColor: "blue", borderRadius: "50%" }} />
              <div style={{ width: "20px", height: "20px", backgroundColor: "green", borderRadius: "50%" }} />
            </div>
          </Box>
        </Grid.Col>

        {/* Right panel: chat/status area */}
        <Grid.Col span={3}>
          <LobbyInfoPanel lobbySettings={lobbySettings} />
        </Grid.Col>
      </Grid>
        </>
      }
    </>
  )
}