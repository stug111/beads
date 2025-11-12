import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { Field, Label, Control, Root } from "@radix-ui/react-form";
import { useState, type FormEvent } from "react";
import { saveTemplate } from "../../api/save-template";
import { rows, columns, template, application, gridTexture, templates } from "../../model/store";
import { toast } from "../../../../shared/lib";
import { db } from "../../../../shared/config";

interface TemplateFormData {
  name: string;
}

export function SaveTemplate() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget)) as unknown as TemplateFormData;
    handleSaveTemplate(data.name);
  };

  const handleSaveTemplate = async (name: string) => {
    setIsLoading(true);
    const currentCells = template();
    const app = application();
    const image = await app?.renderer.extract.image(gridTexture());
    const formattedCells = Array.from(currentCells, ([id, cell]) => ({ [id]: { color: cell.color } }));

    try {
      await saveTemplate({
        rows: rows(),
        cols: columns(),
        name: name ?? "Без названия",
        cells: formattedCells,
        preview: image ? image.src : "",
      });
      const results = await db.query.templates.findMany();
      templates.set(results);
      toast("Шаблон успешно сохранен", { variant: "green" });
      setOpen(false);
    } catch (error) {
      console.error("Ошибка при сохранении шаблона:", error);
      toast("Ошибка при сохранении шаблона", { variant: "red" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button type="button" size="3">
          Сохранить шаблон
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="650px">
        <Root onSubmit={handleSubmit}>
          <Dialog.Title>Сохранение шаблона</Dialog.Title>

          <Flex direction="column" gap="3">
            <Field name="name">
              <Label asChild>
                <Text as="div" size="2" mb="1" weight="bold">
                  Название
                </Text>
              </Label>
              <Control asChild>
                <TextField.Root defaultValue="Шаблон" placeholder="Введите название шаблона" />
              </Control>
            </Field>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Закрыть
              </Button>
            </Dialog.Close>
            <Button type="submit" loading={isLoading}>
              Сохранить
            </Button>
          </Flex>
        </Root>
      </Dialog.Content>
    </Dialog.Root>
  );
}
