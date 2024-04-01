import { useSearchParam } from "../../../hooks/useSearchParams";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "../../../helpers/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateSuplyer } from "../../../api/Suplyer/useCreateSuplyer";
import { useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  name: z.string({ required_error: "Obrigatório" }),
  email: z.string({ required_error: "Obrigatório" }).email(),
  description: z.string({ required_error: "Obrigatório" }).min(1),
  phone: z.string({ required_error: "Obrigatório" }),
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

  const { mutateAsync } = useCreateSuplyer({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readSuplyers"],
      });
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["readSuplyers"],
      });
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    setCreateProductModal(undefined);
    await mutateAsync(data);
  };

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
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              {...register("email")}
              isInvalid={Boolean(formState.errors.email)}
            />
            {formState.errors.email && (
              <Form.Control.Feedback type="invalid">
                {formState.errors.email.message}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="text"
              placeholder="Nome"
              {...register("name")}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingContato" label="Contato">
            <Form.Control
              type="number"
              placeholder="Password"
              {...register("phone")}
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