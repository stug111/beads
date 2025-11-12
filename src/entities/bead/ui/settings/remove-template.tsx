import { TrashIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, IconButton } from "@radix-ui/themes";
import { toast, useSignal } from "../../../../shared/lib";
import { templates } from "../../model/store";
import { useState } from "react";
import { db, schema } from "../../../../shared/config";
import { eq } from "drizzle-orm";

interface RemoveTemplateProps {
  templateId: number;
}

export function RemoveTemplate({ templateId }: RemoveTemplateProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const template = useSignal(templates).find((t) => t.id === templateId);

  const handleRemove = async () => {
    setIsLoading(true);

    try {
      await db.delete(schema.templates).where(eq(schema.templates.id, templateId)).execute();
      toast("Шаблон успешно удален", { variant: "green" });
      const results = await db.query.templates.findMany();
      templates.set(results);
      setOpen(false);
    } catch (error) {
      console.error("Ошибка при удалении шаблона:", error);
      toast("Ошибка при удалении шаблона", { variant: "red" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <IconButton>
          <TrashIcon />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="350px">
        <Dialog.Title>Удалить шаблон {template?.name}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Вы уверены, что хотите удалить этот шаблон? Это действие нельзя будет отменить.
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Закрыть
            </Button>
          </Dialog.Close>
          <Button onClick={handleRemove} loading={isLoading}>
            Удалить
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
