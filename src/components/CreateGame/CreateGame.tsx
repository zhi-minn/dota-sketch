
import classes from './CreateGame.module.css';
import {Accordion, Button, Divider, Group, Modal, SegmentedControl, Text} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {useState} from "react";

export function CreateGame() {
  const [opened, { open, close }] = useDisclosure();

  const [selected, setSelected] = useState<string[]>([]);
  const options = ['Heroes', 'Items', 'Abilities'];
  const toggleOption = (value: string) => {
    setSelected((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

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
            <Accordion.Panel>Options Placeholder</Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Modal>

      <Button size="md" onClick={open}>
        Create Game
      </Button>
    </>
  );
}
