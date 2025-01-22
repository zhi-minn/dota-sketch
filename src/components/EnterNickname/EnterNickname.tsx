import {Button, Group, Modal, TextInput} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export function EnterNickname() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [modalOpened, setModalOpened] = useState(true);

  const joinGame = () => {
    // Communicate nickname to backend (WebSocket)
    console.log('Joining game with nickname:', nickname);
    setModalOpened(false);
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