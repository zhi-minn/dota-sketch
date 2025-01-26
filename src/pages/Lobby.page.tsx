import {EnterNickname} from "@/components/EnterNickname/EnterNickname";
import {LobbyHeader} from "@/components/LobbyHeader/LobbyHeader";
import { Box, Grid } from '@mantine/core';
import {LobbyInfoPanel} from "@/components/LobbyInfoPanel/LobbyInfoPanel";
import {Canvas} from "@/components/Canvas/Canvas";

export function LobbyPage() {
  return (
    <>
      <EnterNickname />
      <LobbyHeader />
      <Grid grow style={{paddingTop: "0.5em"}}>
        {/* Left panel: Lobby info */}
        <Grid.Col span={3}>
          <LobbyInfoPanel/>
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
          <LobbyInfoPanel />
        </Grid.Col>
      </Grid>
    </>
  )
}