import {
  Button,
  Group,
} from '@mantine/core';
import classes from './LobbyHeader.module.css';

export function LobbyHeader() {

  return (
    <header className={classes.header}>
      <Group justify="space-between" h="100%">
        Dota Sketch

        <Group h="100%" gap={0} visibleFrom="sm">
          Waiting for players...
        </Group>

        <Button
          variant="subtle"
          styles={(theme) => ({
            root: {
              backgroundColor: 'rgba(0, 0, 0, 0.4)', // Translucent dark background
              color: 'white',
              border: 'none',
              borderRadius: theme.radius.md,
              padding: '8px 12px',
              transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slightly darker on hover
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              },
            },
          })}
        >
          Invite link
        </Button>
      </Group>
    </header>
  );
}