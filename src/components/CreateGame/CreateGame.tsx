import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Accordion, Button, Checkbox, Divider, Group, Modal, SegmentedControl, Select, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { GameCategory } from '@/enums/gameCategory';
import { LobbySettings } from '@/types/lobbySettings';
import classes from './CreateGame.module.css';


export function CreateGame() {
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure();
  const [lobbySettings, setLobbySettings] = useState<LobbySettings>({
    categories: [],
    drawingTime: 90,
    rounds: 5,
    maxPlayers: 4,
    firstGuessDelay: 0,
    reduceTimeWhenGuessed: true,
    allowWordReroll: true,
    public: false,
  });
  const handleChange = <K extends keyof LobbySettings>(
    field: K,
    value: LobbySettings[K],
  )=> {
    setLobbySettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  // Game options
  const [categories, setCategories] = useState<GameCategory[]>([]);
  const toggleOption = (value: GameCategory) => {
    setCategories((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  // Create Game
  const createGame = async () => {
    const payload = {
      ...lobbySettings,
      categories: categories.map(
        (category) => Object.entries(GameCategory).find(([, value]) => value === category)?.[0]
      ),
    };
    console.log(payload);
    const response = await axios.post('http://localhost:8081/api/games', payload);
    const { code } = response.data;
    navigate(`/lobby/${code}`);
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
          {Object.values(GameCategory).map((option) => (
            <Button
              key={option}
              variant={categories.includes(option) ? 'filled' : 'outline'}
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
                  data={[
                    { value: '30', label: '30s' },
                    { value:'60', label: '60s' },
                    { value: '90', label: '90s' },
                  ]}
                  defaultValue="90"
                  onChange={(value) => handleChange("drawingTime", +value!)}
                />
                <Select
                  label="Rounds"
                  placeholder="Select"
                  data={['1', '3', '5', '7', '9']}
                  defaultValue="5"
                  onChange={(value) => handleChange("rounds", +value!)}
                />
                <Select
                  label="Max Players"
                  placeholder="Select"
                  data={['4', '8', '12']}
                  defaultValue="4"
                  onChange={(value) => handleChange("maxPlayers", +value!)}
                />
                <Select
                  label="First guess delay"
                  placeholder="Select"
                  data={[
                    { value: '0', label: '0s' },
                    { value: '5', label: '5s' },
                    { value: '10', label: '10s' },
                    { value: '15', label: '15s' }
                    ]}
                  defaultValue="0"
                  onChange={(value) => handleChange("firstGuessDelay", +value!)}
                />
              </Group>

              <Checkbox
                label="Reduce time to 30s when word is guessed"
                defaultChecked
                mb="xs"
                onChange={(event) => handleChange("reduceTimeWhenGuessed", event.target.checked)}
              />
              <Checkbox
                label="Allow re-rolling word once"
                defaultChecked
                mb="xs"
                onChange={(event) => handleChange("allowWordReroll", event.target.checked)}
              />
              <Checkbox
                label='Public game (show in "Browse Games")'
                mb="xs"
                onChange={(event) => handleChange("public", event.target.checked)}
              />
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
