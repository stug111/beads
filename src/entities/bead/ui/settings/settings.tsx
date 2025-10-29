import { ColumnsIcon, GearIcon, RowsIcon } from "@radix-ui/react-icons";
import { Button, Flex, IconButton, Popover, Text, TextField, Tooltip } from "@radix-ui/themes";
import { useRef, type ChangeEvent } from "react";
import { batch } from "../../lib/signals";
import { changeColumns, changeRows, columns, rows } from "../../model/store";
import { ColorPicker } from "./color-picker";
import { ColorList } from "./color-list";

export function Settings() {
  const rowsRef = useRef<number>(rows());
  const columnsRef = useRef<number>(columns());

  const handleApplySettings = () => {
    batch(() => {
      changeRows(rowsRef.current);
      changeColumns(columnsRef.current);
    });
  };

  const handleRowsChange = (e: ChangeEvent<HTMLInputElement>) => {
    rowsRef.current = Number(e.target.value);
  };

  const handleColumnsChange = (value: ChangeEvent<HTMLInputElement>) => {
    columnsRef.current = Number(value.target.value);
  };

  return (
    <Popover.Root>
      <Tooltip content="Настройки">
        <Popover.Trigger>
          <IconButton size="3">
            <GearIcon />
          </IconButton>
        </Popover.Trigger>
      </Tooltip>
      <Popover.Content>
        <Flex gap="4" direction="column" maxWidth="212px">
          <Flex direction="column">
            <Text as="label">Кол-во строк:</Text>
            <TextField.Root defaultValue={rowsRef.current} onChange={handleRowsChange} type="number">
              <TextField.Slot>
                <RowsIcon />
              </TextField.Slot>
            </TextField.Root>
          </Flex>
          <Flex direction="column">
            <Text as="label">Кол-во столбцов:</Text>
            <TextField.Root defaultValue={columnsRef.current} onChange={handleColumnsChange} type="number">
              <TextField.Slot>
                <ColumnsIcon />
              </TextField.Slot>
            </TextField.Root>
          </Flex>
          <ColorList />
          <ColorPicker />
          <Button onClick={handleApplySettings}>Применить</Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
