import React from 'react';
import { Card, Text, Group, Button, Stack, Divider } from '@mantine/core';

export function LobbyInfoPanel() {

  return (
    <Card shadow="sm" p="md" radius="md" h="90vh" withBorder>
      <Stack gap="xs">
        <Group gap="apart">
          <Text fw={500}>Lobby Code</Text>
          <Text size="sm">
            CA7Z
          </Text>
        </Group>

        <Divider />

        <Text size="sm">Game mode: Standard</Text>
        <Text size="sm">Language: English</Text>
        <Text size="sm">Guess time: 90s</Text>
        <Text size="sm">Max Players: 12</Text>
        <Text size="sm">Champions: ✓</Text>
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