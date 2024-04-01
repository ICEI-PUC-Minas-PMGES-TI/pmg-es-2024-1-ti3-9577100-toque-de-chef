import { useSearchParam } from "../../../hooks/useSearchParams";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "../../../helpers/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCategory } from "../../../api/Category/useCreateCategory";
import { useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  name: z.string({ required_error: "Obrigatório" }),
  description: z.string({ required_error: "Obrigatório" }).min(1),
});
export const CreateCategoryModal = () => {
  const queryClient = useQueryClient();
  const [createCategoryModal, setCreateCategoryModal] = useSearchParam(
    "createCategoryModal"
  );
  const { handleSubmit, register, formState } = useForm<z.infer<typeof schema>>(
    {
      resolver: zodResolver(schema),
    }
  );

  const { mutateAsync } = useCreateCategory({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readCategories"],
      });
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["readCategories"],
      });
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    setCreateCategoryModal(undefined);
    await mutateAsync(data);
  };

  return (
    <Modal
      show={Boolean(createCategoryModal)}
      onHide={() => setCreateCategoryModal(undefined)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Criar Fornecedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="text"
              placeholder="Nome"
              {...register("name")}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingDescription" label="Descrição">
            <Form.Control
              type="text"
              placeholder="Password"
              {...register("description")}
              isInvalid={Boolean(formState.errors.description)}
            />
            {formState.errors.description && (
              <Form.Control.Feedback type="invalid">
                {formState.errors.description.message}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>

          <div className="d-flex gap-2 mt-2">
            <Button
              variant="secondary"
              onClick={() => setCreateCategoryModal(undefined)}
            >
              Fechar
            </Button>
            <Button type="submit" className="text-white">
              Criar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
