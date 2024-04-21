import { Button, FloatingLabel, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "../../helpers/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateUser } from "../../api/User/useUpdateUser";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCurrentUser } from "../../api/User/useCurrentUser";
import { useEffect } from "react";
import IconUser from "../../components/IconUser";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Route = createFileRoute("/profile/")({
  component: Index,
});

const schemaEditUser = z
  .object({
    name: z.string({ required_error: "Obrigatório" }),
    email: z.string({ required_error: "Obrigatório" }),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine(({ confirmPassword, password }) => password === confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

function Index() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: currentUser } = useCurrentUser();
  console.log("currentUser", currentUser);

  const {
    handleSubmit: handleSubmitUpdate,
    register: update,
    formState: formStateUpdate,
    reset,
  } = useForm<z.infer<typeof schemaEditUser>>({
    resolver: zodResolver(schemaEditUser),
  });

  const { mutateAsync: mutateAsyncUpdate } = useUpdateUser({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCurrentUser"],
      });
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCurrentUser"],
      });
    },
  });

  useEffect(() => {
    reset({
      email: currentUser?.email,
      name: currentUser?.name,
    });
  }, [currentUser, reset]);

  const onSubmitUpdate: SubmitHandler<z.infer<typeof schemaEditUser>> = async (
    data
  ) => {
    await mutateAsyncUpdate({
      user: {
        name: data.name,
        password: data.password,
      },
    });
  };

  const logout = () => {
    navigate({
      to: "/",
    });
    cookies.remove("user");
  };

  return (
    <div
      style={{
        padding: "24px",
        margin: "48px",
        gap: "16px",
        height: "100%",
      }}
    >
      <IconUser tam="180px" fontSize="48px" />
      <Form onSubmit={handleSubmitUpdate(onSubmitUpdate)} className="pt-4">
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

        <FloatingLabel controlId="email" label="Email" className="mb-3">
          <Form.Control
            type="text"
            placeholder="E-mail"
            {...update("email")}
            disabled
          />
          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingDescription"
          label="Senha"
          className="mb-3"
        >
          <Form.Control
            type="password"
            placeholder="Senha"
            {...update("password")}
            isInvalid={Boolean(formStateUpdate.errors.password)}
          />
          {formStateUpdate.errors.password && (
            <Form.Control.Feedback type="invalid">
              {formStateUpdate.errors.password.message}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingContato"
          label="Confirme a Senha"
          className="mb-3"
        >
          <Form.Control
            type="password"
            placeholder="ConfirmeSenha"
            {...update("confirmPassword")}
            isInvalid={Boolean(formStateUpdate.errors.confirmPassword)}
          />
          {formStateUpdate.errors.confirmPassword && (
            <Form.Control.Feedback type="invalid">
              {formStateUpdate.errors.confirmPassword.message}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>

        <div className="d-flex gap-2 mt-2">
          <Button variant="secondary" onClick={logout}>
            Sair
          </Button>
          <Button type="submit" className="text-white">
            Salvar Edições
          </Button>
        </div>
      </Form>
    </div>
  );
}
