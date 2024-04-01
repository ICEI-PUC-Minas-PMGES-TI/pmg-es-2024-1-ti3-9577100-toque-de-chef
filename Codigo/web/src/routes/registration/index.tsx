import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";
import { useCreateUser } from "../../api/User/useCreateUser";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import omit from "lodash/omit";
import { useRegisterUser } from "../../api/User/useRegisterUser";

export const Route = createFileRoute("/registration/")({
  component: Login,
});

function Login() {
  const schema = z
    .object({
      name: z.string({ required_error: "Obrigatório" }),
      email: z.string().email({ message: "Email inválido" }),

      password: z.string({ required_error: "Obrigatório" }),
      confirmPassword: z.string({ required_error: "Obrigatório" }),
    })
    .refine(({ confirmPassword, password }) => password === confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const { mutate } = useRegisterUser({
    onError: (error) => {
      console.error(error.message);
    },
    onSuccess: () => {
      console.log("Cadastro realizado com sucesso");
    },
  });

  const { handleSubmit, register, formState } = useForm<z.infer<typeof schema>>(
    {
      resolver: zodResolver(schema),
    }
  );

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    mutate(omit(data, "confirmPassword"));
  };

  return (
    <div
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FloatingLabel controlId="floatingPassword" label="Nome">
          <Form.Control type="text" placeholder="Nome" {...register("name")} />
        </FloatingLabel>

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

        <FloatingLabel controlId="floatingDescription" label="Password">
          <Form.Control
            type="text"
            placeholder="Password"
            {...register("password")}
            isInvalid={Boolean(formState.errors.password)}
          />
          {formState.errors.password && (
            <Form.Control.Feedback type="invalid">
              {formState.errors.password.message}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>

        <FloatingLabel controlId="floatingContato" label="Confirme a Senha">
          <Form.Control
            type="number"
            placeholder="Password"
            {...register("confirmPassword")}
          />
        </FloatingLabel>

        <Button type="submit">Salvar</Button>
      </Form>
    </div>
  );
}
