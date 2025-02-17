import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Group, Modal, TextInput } from "@mantine/core";

interface EnterNicknameProps {
  onNicknameEntered: (nickname: string) => void;
}

export function EnterNickname({ onNicknameEntered }: EnterNicknameProps) {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [modalOpened, setModalOpened] = useState(false);

  // Invalid lobby redirection
  const { code: gameCode } = useParams<{ code: string }>();
  useEffect(() => {
    const fetchLiveGames = async () => {
      const response = await axios.get("http://localhost:8081/metrics/live-games")
      if (!gameCode || !Object.keys(response.data).includes(gameCode)) {
        navigate("/")
      }
    }

    fetchLiveGames();
  }, []);

  // Open modal if nickname not set
  useEffect(() => {
    const storedName = localStorage.getItem(`${gameCode}_uid`);
    if (!storedName) {
      setModalOpened(true);
    } else {
      setNickname(storedName);
    }
  }, []);

  const joinGame = async () => {
    const response = await axios.post(`http://localhost:8081/api/games/${gameCode}`, { nick: nickname });
    const { uid } = response.data;
    localStorage.setItem(`${gameCode}_uid`, uid);
    setModalOpened(false);
    onNicknameEntered(nickname);
  };

  // Back button
  const navigateBack = () => {
    navigate(-1)
  }

  return (
    <Modal
      opened={modalOpened}
      onClose={() => {}}
      radius="md"
      withCloseButton={false}
    >

      <h2>Choose Your Nickname</h2>

      <TextInput
        placeholder="Enter a nickname..."
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <Group justify="flex-end" mt="md">
        <Button onClick={navigateBack} variant="filled" color="gray" mt="md">Back</Button>
        <Button onClick={joinGame} mt="md">
          Join
        </Button>
      </Group>
    </Modal>
  )
}