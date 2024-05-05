import { useSearchParam } from "../../../hooks/useSearchParams";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "../../../helpers/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateSuplyer } from "../../../api/Suplyer/useCreateSuplyer";
import { useQueryClient } from "@tanstack/react-query";
import InputMask from "react-input-mask";

const phoneRegExp = /^\(\d{2}\) \d{5}-\d{4}$/;

const schema = z.object({
  name: z.string({ required_error: "Obrigatório" }),
  email: z.string({ required_error: "Obrigatório" }).email(),
  description: z.string({ required_error: "Obrigatório" }).min(1),
  phone: z
    .string({ required_error: "Obrigatório" })
    .refine((value) => phoneRegExp.test(value), {
      message:
        "Formato inválido para número de telefone. Use o formato: (99) 99999-9999",
    }),
});

export const CreateSuplyerModal = () => {
  const queryClient = useQueryClient();
  const [createSuplyerModal, setCreateSuplyerModal] =
    useSearchParam("createSuplyerModal");
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
    setCreateSuplyerModal(undefined);
    await mutateAsync(data);
  };

  return (
    <Modal
      show={Boolean(createSuplyerModal)}
      onHide={() => setCreateSuplyerModal(undefined)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Criar Fornecedor</Modal.Title>
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
          <FloatingLabel
            controlId="floatingPassword"
            label="Nome"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Nome"
              {...register("name")}
            />
          </FloatingLabel>
          <FloatingLabel controlId="phoneInput" label="Contato">
            <InputMask
              mask="(99) 99999-9999"
              maskChar="_" // This is optional, you can customize the placeholder character for empty positions in the mask
              type="tel" // Use "tel" type for phone numbers
              placeholder="(00) 00000-0000"
              {...register("phone")}
              as={Form.Control} // Use as prop to render the InputMask as a Form.Control
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingDescription"
            label="Descrição"
            className="mb-3"
          >
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
              onClick={() => setCreateSuplyerModal(undefined)}
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
