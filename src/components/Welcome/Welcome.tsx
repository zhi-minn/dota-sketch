import {Container, Title, Text, Image, Stack} from '@mantine/core';
import classes from './Welcome.module.css';
import {CreateGame} from "@/components/CreateGame/CreateGame";
import {BrowseGames} from "@/components/BrowseGames/BrowseGames";

export function Welcome() {

    const containerStyle = {
        border: '2px solid #000', // Light gray border
        borderRadius: '8px',      // Rounded corners
        padding: '20px',          // Space inside the box
        background: '#f8fcfc'
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
                src="src/assets/homepage_logo.webp"
                alt="Game Logo"
                radius="md"
                className={classes.logo}
                mb="xl"
            />

            <Stack gap="xl">
                <CreateGame/>
                <BrowseGames/>
            </Stack>
        </Container>
    );
}
