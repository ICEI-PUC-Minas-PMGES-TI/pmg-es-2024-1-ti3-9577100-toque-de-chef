import { createFileRoute, useNavigate } from "@tanstack/react-router";
import * as z from "zod";
import { Form, FloatingLabel, Button, Image } from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import omit from "lodash/omit";
import { useRegisterUser } from "../../api/User/useRegisterUser";
import { toast } from "sonner";
import Cookies from "universal-cookie";
import { useState } from "react";
import { Check } from "react-bootstrap-icons";
const cookies = new Cookies();

export const Route = createFileRoute("/registration/")({
  component: Login,
});

const schema = z
  .object({
    name: z.string({ required_error: "Obrigatório" }).min(1),
    email: z.string().email({ message: "Email inválido" }),
    password: z.string({ required_error: "Obrigatório" }).min(1),
    confirmPassword: z.string({ required_error: "Obrigatório" }).min(1),
  })
  .refine(({ confirmPassword, password }) => password === confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

function Login() {
  const navigate = useNavigate();

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordCriteria, setPasswordCriteria] = useState([
    { text: "Letra maiúscula", satisfied: false },
    { text: "Letra minúscula", satisfied: false },
    { text: "Caracter especial", satisfied: false },
    { text: "Número", satisfied: false },
  ]);

  // Função para calcular a força da senha e os critérios
  const calculatePasswordStrength = (password) => {
    // Critérios de força da senha
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const numberRegex = /[0-9]/;

    let strength = 0;
    const criteria = [...passwordCriteria];

    // Verificar se a senha contém letras minúsculas
    if (password.match(lowerCaseRegex)) {
      strength += 25;
      criteria[1].satisfied = true;
    } else {
      criteria[1].satisfied = false;
    }

    // Verificar se a senha contém letras maiúsculas
    if (password.match(upperCaseRegex)) {
      strength += 25;
      criteria[0].satisfied = true;
    } else {
      criteria[0].satisfied = false;
    }

    // Verificar se a senha contém caracteres especiais
    if (password.match(specialCharRegex)) {
      strength += 25;
      criteria[2].satisfied = true;
    } else {
      criteria[2].satisfied = false;
    }

    // Verificar se a senha contém números
    if (password.match(numberRegex)) {
      strength += 25;
      criteria[3].satisfied = true;
    } else {
      criteria[3].satisfied = false;
    }

    // Atualizar a força da senha e os critérios
    setPasswordStrength(strength);
    setPasswordCriteria(criteria);
  };

  const { mutate } = useRegisterUser({
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      cookies.set("user", data.token, { path: "/" });
      toast.success("Cadastro realizado com sucesso!");
      navigate({
        to: "/awaiting-system-access/",
      });
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

  const backgroundColorProgressBar = () => {
    if (passwordStrength > 75) {
      return "#28a745"; // Verde
    } else if (passwordStrength > 50) {
      return "#007bff"; // Azul
    } else if (passwordStrength > 25) {
      return "#ffc107"; // Amarelo
    } else {
      return "#dc3545"; // Vermelho
    }
  };

  const disabledButton = () => {
    if (passwordStrength == 100) {
      return false;
    }
    return true;
  };

  return (
    <div
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "flex-end",
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
        <Form
          style={{ width: "360px" }}
          onSubmit={handleSubmit(onSubmit)}
          className="d-inline-flex flex-column gap-2 w-50 "
        >
          <FloatingLabel controlId="floatingPassword" label="Nome">
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

          <FloatingLabel controlId="floatingInput" label="Email">
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

          <FloatingLabel controlId="floatingDescription" label="Senha">
            <Form.Control
              type="password"
              placeholder="Senha"
              {...register("password", {
                onChange: (e) => calculatePasswordStrength(e.target.value),
              })}
              isInvalid={Boolean(formState.errors.password)}
            />
            {/* Sua barra de progresso */}
            <div>
              <div className="progress mt-2">
                <div
                  className="progress-bar "
                  role="progressbar"
                  style={{
                    width: `${passwordStrength}%`,
                    backgroundColor: backgroundColorProgressBar(),
                  }}
                  aria-valuenow={passwordStrength}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
              {/* Texto informativo com ícones */}
              <div>
                {passwordCriteria.map((criterion, index) => (
                  <div key={index} className="d-grid">
                    {criterion.satisfied ? (
                      <span>
                        <Check color="green" />
                        {criterion.text}
                      </span>
                    ) : (
                      "- " + criterion.text
                    )}
                  </div>
                ))}
              </div>
            </div>
            {formState.errors.password && (
              <Form.Control.Feedback type="invalid">
                {formState.errors.password.message}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>

          <FloatingLabel controlId="floatingContato" label="Confirme a Senha">
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("confirmPassword")}
              isInvalid={Boolean(formState.errors.confirmPassword)}
            />
            {formState.errors.confirmPassword && (
              <Form.Control.Feedback type="invalid">
                {formState.errors.confirmPassword.message}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>

          <div className="d-flex gap-2 ">
            <Button
              onClick={() => navigate({ to: "/" })}
              variant="secondary"
              className="w-100"
            >
              <strong>Voltar ao login</strong>
            </Button>
            <Button
              type="submit"
              className="w-100 text-white"
              disabled={disabledButton()}
            >
              <strong>Registrar</strong>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
