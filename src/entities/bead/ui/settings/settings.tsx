import { ColumnsIcon, GearIcon, RowsIcon } from "@radix-ui/react-icons";
import { Button, Flex, IconButton, Popover, Text, TextField, Tooltip } from "@radix-ui/themes";
import { type ChangeEvent, useState } from "react";
import { clearOutOfBoundsCells, columns, isGridResized, rows } from "../../model/store";
import { ColorPicker } from "./color-picker";
import { ColorList } from "./color-list";
import { batch, useSignal } from "../../../../shared/lib";

export function Settings() {
  const currentRows = useSignal(rows);
  const currentColumns = useSignal(columns);
  const [localRows, setLocalRows] = useState(currentRows);
  const [localColumns, setLocalColumns] = useState(currentColumns);

  const handleApplySettings = () => {
    batch(() => {
      rows.set(localRows);
      columns.set(localColumns);
      clearOutOfBoundsCells(localRows, localColumns);
      isGridResized.set(true);
    });
  };

  const handleRowsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalRows(Number(e.target.value));
  };

  const handleColumnsChange = (value: ChangeEvent<HTMLInputElement>) => {
    setLocalColumns(Number(value.target.value));
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setLocalRows(currentRows);
      setLocalColumns(currentColumns);
    }
  };

  return (
    <Popover.Root onOpenChange={handleOpenChange}>
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
            <TextField.Root value={String(localRows)} onChange={handleRowsChange} type="number">
              <TextField.Slot>
                <RowsIcon />
              </TextField.Slot>
            </TextField.Root>
          </Flex>
          <Flex direction="column">
            <Text as="label">Кол-во столбцов:</Text>
            <TextField.Root value={String(localColumns)} onChange={handleColumnsChange} type="number">
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
