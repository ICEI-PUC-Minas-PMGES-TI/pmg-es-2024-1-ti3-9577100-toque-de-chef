import { useSearchParam } from "../../../hooks/useSearchParams";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "../../../helpers/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProduct } from "../../../api/Product/useUpdateProduct";
import { useQueryClient } from "@tanstack/react-query";
import { useReadProducts } from "../../../api/Product/useReadProducts";
import { useEffect } from "react";

const schemaEdit = z.object({
  name: z.string({ required_error: "Obrigatório" }),
  description: z.string({ required_error: "Obrigatório" }),
  unit_Price: z.number({ required_error: "Obrigatório" }).min(1),
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
        unitPrice: data.unit_Price,
        description: data.description,
        name: data.name,
      },
    });
  };

  useEffect(() => {
    if (productData) {
      reset(selectedProductToUpdate);
    }
  }, [isLoading, reset, selectedProductToUpdate, productData]);

  console.log("selectedProductToUpdate", selectedProductToUpdate);

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

          <FloatingLabel
            controlId="unitPrice"
            label="Preço Unitário"
            className="mb-3"
          >
            <Form.Control
              type="number"
              placeholder="Preço Unitário"
              {...update("unit_Price", { valueAsNumber: true })}
              isInvalid={Boolean(formStateUpdate.errors.unit_Price)}
            />
            {formStateUpdate.errors.unit_Price && (
              <Form.Control.Feedback type="invalid">
                {formStateUpdate.errors.unit_Price.message}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>
          <FloatingLabel
            controlId="categoryId"
            label="Categoria"
            className="mb-3"
          >
            <Form.Control
              type="number"
              placeholder="Categoria"
              {...update("category.id", { valueAsNumber: true })}
              isInvalid={Boolean(formStateUpdate.errors.category?.id)}
            />
            {formStateUpdate.errors.category?.id && (
              <Form.Control.Feedback type="invalid">
                {formStateUpdate.errors.category?.id?.message}
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
