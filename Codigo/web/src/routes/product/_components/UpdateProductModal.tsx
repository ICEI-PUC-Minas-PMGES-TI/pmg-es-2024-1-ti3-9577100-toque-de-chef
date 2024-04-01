import { useSearchParam } from "../../../hooks/useSearchParams";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "../../../helpers/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateSuplyer } from "../../../api/Suplyer/useUpdateSuplyer";
import { useQueryClient } from "@tanstack/react-query";
import { useReadSuplyers } from "../../../api/Suplyer/useReadSuplyers";
import { useEffect } from "react";

const schemaEdit = z.object({
  name: z.string({ required_error: "Obrigatório" }),
  email: z.string({ required_error: "Obrigatório" }).email(),
  description: z.string({ required_error: "Obrigatório" }).min(1),
  phone: z.string({ required_error: "Obrigatório" }),
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

  const { data: suplyerData, isLoading } = useReadSuplyers();
  const selectedSuplyerToUpdate = suplyerData?.find(
    (suplyer) => suplyer.id === Number(updateProductModal)
  );
  const { mutateAsync: mutateAsyncUpdate } = useUpdateSuplyer({
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

  const onSubmitUpdate: SubmitHandler<z.infer<typeof schemaEdit>> = async (
    data
  ) => {
    setUpdateProductModal(undefined);
    await mutateAsyncUpdate({
      suplyer: { ...data, id: selectedSuplyerToUpdate?.id },
    });
  };

  useEffect(() => {
    if (suplyerData) {
      reset(selectedSuplyerToUpdate);
    }
  }, [isLoading, reset, selectedSuplyerToUpdate, suplyerData]);

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
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              {...update("email")}
              isInvalid={Boolean(formStateUpdate.errors.email)}
            />
            {formStateUpdate.errors.email && (
              <Form.Control.Feedback type="invalid">
                {formStateUpdate.errors.email.message}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="text" placeholder="Nome" {...update("name")} />
          </FloatingLabel>
          <FloatingLabel controlId="floatingContato" label="Contato">
            <Form.Control
              type="number"
              placeholder="Password"
              {...update("phone")}
            />
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
