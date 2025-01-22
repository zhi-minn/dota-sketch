import {useDisclosure} from "@mantine/hooks";
import {Button, Modal} from "@mantine/core";

export function BrowseGames() {
  const [opened, {open, close}] = useDisclosure();

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create Game" radius="md">
        <span>Browse Games Placeholder</span>
      </Modal>
      <Button size="md" onClick={open}>
        Browse Games
      </Button>
    </>
  );
}