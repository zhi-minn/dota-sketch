
import classes from './CreateGame.module.css';
import {Accordion, Button, Checkbox, Divider, Group, Modal, SegmentedControl, Select, Text} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function CreateGame() {
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure();

  // Game options
  const [selected, setSelected] = useState<string[]>([]);
  const options = ['Heroes', 'Items', 'Abilities'];
  const toggleOption = (value: string) => {
    setSelected((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  // Create Game
  const createGame = async () => {
    const response = await axios.post('http://localhost:8081/api/create-game');
    const { gameCode } = response.data;
    navigate(`/lobby/${gameCode}`);
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={<Text fw={600}>Create Game</Text>}
        size="lg"
        radius="md"
      >
        <SegmentedControl
          fullWidth
          data={['Normal', 'Rapid Fire']}
          styles={{
            label: {
              fontWeight: 'bold',
            }
          }}
        />

        <Divider className={classes.divider}/>

        <Group className={classes.game_options_group} grow>
          {options.map((option) => (
            <Button
              key={option}
              variant={selected.includes(option) ? 'filled' : 'outline'}
              onClick={() => toggleOption(option)}
            >
              <Text fw={600}>{option}</Text>
            </Button>
          ))}
        </Group>

        <Divider className={classes.accordion_divider}/>

        <Accordion>
          <Accordion.Item key="Advanced options" value="Advanced options">
            <Accordion.Control icon="⚙️">Advanced options</Accordion.Control>
            <Accordion.Panel>
              <Group grow gap="md" mb="md">
                <Select
                  label="Drawing time"
                  placeholder="Select"
                  data={['30s', '60s', '90s']}
                  defaultValue="90s"
                />
                <Select
                  label="Rounds"
                  placeholder="Select"
                  data={['1', '3', '5', '7', '9']}
                  defaultValue="5"
                />
                <Select
                  label="Max Players"
                  placeholder="Select"
                  data={['4', '8', '12']}
                  defaultValue="4"
                />
                <Select
                  label="First guess delay"
                  placeholder="Select"
                  data={['0s', '5s', '10s', '15s']}
                  defaultValue="0s"
                />
              </Group>

              <Checkbox label="Reduce time to 30s when word is guessed" defaultChecked mb="xs" />
              <Checkbox label="Allow re-rolling word once" defaultChecked mb="xs" />
              <Checkbox label='Public game (show in "Browse Games")' mb="xs" />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={close}>Close</Button>
          <Button onClick={createGame}>Create</Button>
        </Group>
      </Modal>

      <Button size="md" onClick={open}>
        Create Game
      </Button>
    </>
  );
}
