import { createFileRoute } from "@tanstack/react-router";
import { Button, Form, Alert } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { useLoginUser } from "../api/User/useLoginUser";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "../helpers/zod";
import { useNavigate } from "@tanstack/react-router";
import Cookies from "universal-cookie";
import { useState } from "react";
const cookies = new Cookies();

export const Route = createFileRoute("/")({
  component: Index,
});

const schema = z.object({
  email: z.string({ required_error: "Obrigatório" }),
  password: z.string({ required_error: "Obrigatório" }).min(1),
});

function Index() {
  const navigate = useNavigate();
  const { mutateAsync } = useLoginUser();
  const { register, handleSubmit } = useForm<z.infer<typeof schema>>();
  const [loginError, setLoginError] = useState(""); // Estado para controlar o erro de login

  const handleLogin: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    try {
      const response = await mutateAsync({
        email: data.email,
        password: data.password,
      });

      // Verifica o tipo de usuário após o login
      if (response && response.user.type === 4) {
        setLoginError("Acesso negado entre em contato com o seu Gestor");
      } else if (response && response.user.type === 3) {
        navigate({ to: "/awaiting-system-access/" }); // Substitua "/destinationForType3" pelo destino correto para o tipo 3
      } else {
        navigate({ to: "/product" });
      }

      // Salva o token de usuário nos cookies
      cookies.set("user", response.token, { path: "/" });
    } catch (error) {
      // Em caso de erro no login, exibe a mensagem de erro
      setLoginError("Credenciais inválidas");
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "100vh",
            width: "50vw",
            display: "flex",
            gap: "48px",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.8)",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Image style={{ height: "140px" }} src={"/public/logo.png"} />
          <Form style={{ width: "360px" }} onSubmit={handleSubmit(handleLogin)}>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
              <Form.Control
                size="lg"
                type="email"
                placeholder="email"
                {...register("email")}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
              <Form.Control
                size="lg"
                type="password"
                placeholder="senha"
                {...register("password")}
              />
            </Form.Group>
            <div className="d-flex gap-2">
              <Button
                variant="secondary"
                onClick={() => navigate({ to: "/registration" })}
              >
                <strong>Registrar-se</strong>
              </Button>
              <Button type="submit" className="text-white">
                <strong>Entrar</strong>
              </Button>
            </div>
          </Form>
          {/* Exibe mensagem de erro de login */}
          {loginError && <Alert variant="danger">{loginError}</Alert>}
        </div>
      </div>
    </>
  );
}
