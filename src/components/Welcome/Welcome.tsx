import {Container, Title, Text, Button, Image, Stack} from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {

    const containerStyle = {
        border: '2px solid #ccc', // Light gray border
        borderRadius: '8px',      // Rounded corners
        padding: '20px',          // Space inside the box
    }

    return (
        <Container size="sm" style={containerStyle} className={classes.container} mt={80}>
            <Title ta="center" mb="sm">
                Dota Sketch
            </Title>

            <Text c="dimmed" ta="center" size="md" mb="xl">
                A fun sketching and guessing game for everyone!
            </Text>

            <Image
                src="src/assets/logo.webp"
                alt="Game Logo"
                radius="md"
                className={classes.logo}
                mb="xl"
            />

            <Stack gap="xl">
                <Button size="md">
                    Create a Game
                </Button>
                <Button variant="filled" size="md">
                    Browse Games
                </Button>
            </Stack>
        </Container>
    );
}
