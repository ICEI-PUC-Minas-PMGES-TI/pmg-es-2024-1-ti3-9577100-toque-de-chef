import { useSearchParam } from "../../../hooks/useSearchParams";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "../../../helpers/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProduct } from "../../../api/Product/useCreateProduct";
import { useQueryClient } from "@tanstack/react-query";
import { useReadCategories } from "../../../api/Category/useReadCategories";

const schema = z.object({
  name: z.string({ required_error: "Obrigatório" }),
  description: z.string({ required_error: "Obrigatório" }),
  unitPrice: z.number({ required_error: "Obrigatório" }).min(1),
  categoryId: z.number({ required_error: "Obrigatório" }).min(1),
});

export const CreateProductModal = () => {
  const queryClient = useQueryClient();

  const [createProductModal, setCreateProductModal] =
    useSearchParam("createProductModal");

  const { handleSubmit, register, formState } = useForm<z.infer<typeof schema>>(
    {
      resolver: zodResolver(schema),
    }
  );

  const { mutateAsync } = useCreateProduct({
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

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    setCreateProductModal(undefined);
    await mutateAsync(data);
  };

  const { data: categoryData } = useReadCategories();

  return (
    <Modal
      show={Boolean(createProductModal)}
      onHide={() => setCreateProductModal(undefined)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Criar Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FloatingLabel controlId="name" label="Nome" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nome"
              {...register("name")}
              isInvalid={Boolean(formState.errors.name)}
            />
            {formState.errors.name && (
              <Form.Control.Feedback type="invalid">
                {formState.errors.name.message}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>

          <FloatingLabel
            controlId="description"
            label="Descrição"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Descrição"
              {...register("description")}
              isInvalid={Boolean(formState.errors.description)}
            />
            {formState.errors.description && (
              <Form.Control.Feedback type="invalid">
                {formState.errors.description.message}
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
              {...register("unitPrice", { valueAsNumber: true })}
              isInvalid={Boolean(formState.errors.unitPrice)}
            />
            {formState.errors.unitPrice && (
              <Form.Control.Feedback type="invalid">
                {formState.errors.unitPrice.message}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>

          <Form.Select
            aria-label="Default select example"
            {...register("categoryId", { valueAsNumber: true })}
            isInvalid={Boolean(formState.errors.categoryId)}
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
              onClick={() => setCreateProductModal(undefined)}
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
