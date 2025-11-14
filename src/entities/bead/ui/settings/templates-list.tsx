import { Box, Button, Card, Dialog, Flex, Grid, Inset, Text } from "@radix-ui/themes";
import { batch, useSignal } from "../../../../shared/lib";
import { columns, isNewPalette, rows, template, templates, type Cell } from "../../model/store";
import type { BeadCellId } from "../../lib/bead-cell-id";
import { RemoveTemplate } from "./remove-template";

export function TemplatesList() {
  const currentTemplates = useSignal(templates);

  const handleClickTemplate = (templateId: number) => () => {
    const currentTemplate = currentTemplates.find((t) => t.id === templateId)!;

    const entries: [BeadCellId, Cell][] = [];

    currentTemplate.cells.forEach((obj) => {
      for (const [k, v] of Object.entries(obj) as [BeadCellId, Cell][]) {
        entries.push([k, { color: v.color }]);
      }
    });

    const newTemplate = new Map<BeadCellId, Cell>(entries);

    batch(() => {
      rows.set(currentTemplate.rows);
      columns.set(currentTemplate.cols);
      template.set(newTemplate);
      isNewPalette.set(true);
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="3">Список шаблонов</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="650px">
        <Dialog.Title>Список шаблонов</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Выберите шаблон для редактирования.
        </Dialog.Description>

        <Grid columns="3" gap="3">
          {currentTemplates.map((template) => (
            <Box key={template.id} className="group relative">
              <Card size="2" onClick={handleClickTemplate(template.id)} className="cursor-pointer">
                <Inset clip="padding-box" side="top" pb="current">
                  <img
                    src={template.preview}
                    alt="Bold typography"
                    style={{
                      display: "block",
                      objectFit: "contain",
                      width: "100%",
                      height: 140,
                      backgroundColor: "var(--gray-5)",
                    }}
                  />
                </Inset>
                <Text as="p" size="3">
                  {template.name}
                </Text>
              </Card>
              <Box
                position="absolute"
                top="0"
                right="0"
                m="2"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <RemoveTemplate templateId={template.id} />
              </Box>
            </Box>
          ))}
        </Grid>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Закрыть
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
