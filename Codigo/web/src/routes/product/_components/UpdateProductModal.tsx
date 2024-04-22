import { useSearchParam } from "../../../hooks/useSearchParams";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "../../../helpers/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProduct } from "../../../api/Product/useUpdateProduct";
import { useQueryClient } from "@tanstack/react-query";
import { useReadProducts } from "../../../api/Product/useReadProducts";
import { useEffect } from "react";
import { useReadCategories } from "../../../api/Category/useReadCategories";

const schemaEdit = z.object({
  name: z.string({ required_error: "Obrigatório" }),
  description: z.string({ required_error: "Obrigatório" }),
  category: z.object({
    id: z.number({ required_error: "Obrigatório" }).min(1),
  }),
});

export const UpdateProductModal = () => {
  const queryClient = useQueryClient();

  const [updateProductModal, setUpdateProductModal] =
    useSearchParam("updateProductModal");
  const {
    handleSubmit: handleSubmitUpdate,
    register: update,
    formState: formStateUpdate,
    reset,
  } = useForm<z.infer<typeof schemaEdit>>({
    resolver: zodResolver(schemaEdit),
  });

  const { data: productData, isLoading } = useReadProducts(null);
  const selectedProductToUpdate = productData?.obj?.find(
    (product) => product.id === Number(updateProductModal)
  );
  const { mutateAsync: mutateAsyncUpdate } = useUpdateProduct({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readProducts"],
      });
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["readProducts"],
      });
    },
  });

  const onSubmitUpdate: SubmitHandler<z.infer<typeof schemaEdit>> = async (
    data
  ) => {
    setUpdateProductModal(undefined);
    await mutateAsyncUpdate({
      product: {
        id: selectedProductToUpdate?.id,
        categoryId: data.category.id,
        description: data.description,
        name: data.name,
      },
    });
  };

  const { data: categoryData } = useReadCategories();

  useEffect(() => {
    if (productData) {
      reset(selectedProductToUpdate);
    }
  }, [isLoading, reset, selectedProductToUpdate, productData]);

  return (
    <Modal
      show={Boolean(updateProductModal)}
      onHide={() => setUpdateProductModal(undefined)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitUpdate(onSubmitUpdate)}>
          <FloatingLabel controlId="name" label="Nome" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nome"
              {...update("name")}
              isInvalid={Boolean(formStateUpdate.errors.name)}
            />
            {formStateUpdate.errors.name && (
              <Form.Control.Feedback type="invalid">
                {formStateUpdate.errors.name.message}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>

          <FloatingLabel controlId="floatingDescription" label="Descrição">
            <Form.Control
              type="text"
              placeholder="Descrição"
              {...update("description")}
              isInvalid={Boolean(formStateUpdate.errors.description)}
            />
            {formStateUpdate.errors.description && (
              <Form.Control.Feedback type="invalid">
                {formStateUpdate.errors.description.message}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>

          <Form.Select
            aria-label="Default select example"
            {...update("category.id", { valueAsNumber: true })}
            isInvalid={Boolean(formStateUpdate.errors.category?.id)}
          >
            <option value="">Selecione uma categoria</option>
            {categoryData?.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.name}
              </option>
            ))}
          </Form.Select>

          <div className="d-flex gap-2 mt-2">
            <Button
              variant="secondary"
              onClick={() => setUpdateProductModal(undefined)}
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
