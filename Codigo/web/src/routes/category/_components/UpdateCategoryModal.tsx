import { useSearchParam } from "../../../hooks/useSearchParams";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "../../../helpers/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateCategory } from "../../../api/Category/useUpdateCategory";
import { useQueryClient } from "@tanstack/react-query";
import { useReadCategories } from "../../../api/Category/useReadCategories";
import { useEffect } from "react";

const schemaEdit = z.object({
  name: z.string({ required_error: "Obrigatório" }),
  description: z.string({ required_error: "Obrigatório" }).min(1),
});

export const UpdateCategoryModal = () => {
  const queryClient = useQueryClient();
  const [updateCategoryModal, setUpdateCategoryModal] = useSearchParam(
    "updateCategoryModal"
  );
  const {
    handleSubmit: handleSubmitUpdate,
    register: update,
    formState: formStateUpdate,
    reset,
  } = useForm<z.infer<typeof schemaEdit>>({
    resolver: zodResolver(schemaEdit),
  });

  const { data: categoryData, isLoading } = useReadCategories();
  const selectedCategoryToUpdate = categoryData?.find(
    (category) => category.id === Number(updateCategoryModal)
  );
  const { mutateAsync: mutateAsyncUpdate } = useUpdateCategory({
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

  const onSubmitUpdate: SubmitHandler<z.infer<typeof schemaEdit>> = async (
    data
  ) => {
    setUpdateCategoryModal(undefined);
    await mutateAsyncUpdate({
      category: { ...data, id: selectedCategoryToUpdate?.id },
    });
  };

  useEffect(() => {
    if (categoryData) {
      reset(selectedCategoryToUpdate);
    }
  }, [isLoading, reset, selectedCategoryToUpdate, categoryData]);

  return (
    <Modal
      show={Boolean(updateCategoryModal)}
      onHide={() => setUpdateCategoryModal(undefined)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Fornecedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitUpdate(onSubmitUpdate)}>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="text" placeholder="Nome" {...update("name")} />
          </FloatingLabel>

          <FloatingLabel controlId="floatingDescription" label="Descrição">
            <Form.Control
              type="text"
              placeholder="Password"
              {...update("description")}
              isInvalid={Boolean(formStateUpdate.errors.description)}
            />
            {formStateUpdate.errors.description && (
              <Form.Control.Feedback type="invalid">
                {formStateUpdate.errors.description.message}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>

          <div className="d-flex gap-2 mt-2">
            <Button
              variant="secondary"
              onClick={() => setUpdateCategoryModal(undefined)}
            >
              Fechar
            </Button>
            <Button type="submit" className="text-white">
              Salvar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
