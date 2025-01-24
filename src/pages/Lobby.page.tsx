import {EnterNickname} from "@/components/EnterNickname/EnterNickname";
import {LobbyHeader} from "@/components/LobbyHeader/LobbyHeader";
import {Grid} from "@mantine/core";
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
          <Canvas />
        </Grid.Col>

        {/* Right panel: chat/status area */}
        <Grid.Col span={3}>
          <LobbyInfoPanel />
        </Grid.Col>
      </Grid>
    </>
  )
}