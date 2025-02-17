import React from 'react';
import { Button, Card, Divider, Group, Stack, Text } from '@mantine/core';
import { LobbySettings } from '@/types/lobbySettings';


interface LobbyInfoPanelProps {
  lobbySettings: LobbySettings;
}

const LobbyInfoPanel: React.FC<LobbyInfoPanelProps> = ({
  lobbySettings
})=> {

  return (
    <Card shadow="sm" p="md" radius="md" h="90vh" withBorder>
      <Stack gap="xs">
        <Group gap="apart">
          <Text fw={500}>Lobby Code</Text>
          <Text size="sm">CA7Z</Text>
        </Group>

        <Divider />

        <Text size="sm">Game mode: Standard</Text>
        <Text size="sm">Language: English</Text>
        <Text size="sm">Guess time: {lobbySettings.drawingTime}</Text>
        <Text size="sm">Max Players: {lobbySettings.maxPlayers}</Text>
        {lobbySettings.categories.map((category) => (
          <Text size="sm">{category.valueOf()}: ✓</Text>
        ))}
        <Text size="sm">Reduce time on guess: ✓</Text>
        <Text size="sm">Allow re-rolling: ✓</Text>

        <Divider />

        <Button variant="light" color="teal" fullWidth>
          Invite link
        </Button>
      </Stack>
    </Card>
  );
}

export default LobbyInfoPanel;