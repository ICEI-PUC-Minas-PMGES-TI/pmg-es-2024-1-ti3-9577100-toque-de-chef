import { Button, FloatingLabel, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "../../helpers/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateUser } from "../../api/User/useUpdateUser";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCurrentUser } from "../../api/User/useCurrentUser";
import { useEffect, useState } from "react";
import IconUser from "../../components/IconUser";
import Cookies from "universal-cookie";
import { Check } from "react-bootstrap-icons";
const cookies = new Cookies();

export const Route = createFileRoute("/profile/")({
  component: Index,
});

const schemaEditUser = z
  .object({
    name: z.string({ required_error: "Obrigatório" }),
    email: z.string({ required_error: "Obrigatório" }),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
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
        ...(data.password && { password: data.password }),
      },
    });
  };

  const logout = () => {
    navigate({
      to: "/",
    });
    cookies.remove("user");
    queryClient.removeQueries({
      queryKey: ["getCurrentUser"],
    });
  };

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordCriteria, setPasswordCriteria] = useState([
    { text: "Letra maiúscula", satisfied: false },
    { text: "Letra minúscula", satisfied: false },
    { text: "Caracter especial", satisfied: false },
    { text: "Número", satisfied: false },
  ]);

  const [editingProfile, setEditingProfile] = useState(false);

  const toggleEditing = () => {
    setEditingProfile(!editingProfile);
  };

  const calculatePasswordStrength = (password) => {
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const numberRegex = /[0-9]/;

    let strength = 0;
    const criteria = [...passwordCriteria];

    if (password.match(lowerCaseRegex)) {
      strength += 25;
      criteria[1].satisfied = true;
    } else {
      criteria[1].satisfied = false;
    }

    if (password.match(upperCaseRegex)) {
      strength += 25;
      criteria[0].satisfied = true;
    } else {
      criteria[0].satisfied = false;
    }

    if (password.match(specialCharRegex)) {
      strength += 25;
      criteria[2].satisfied = true;
    } else {
      criteria[2].satisfied = false;
    }

    if (password.match(numberRegex)) {
      strength += 25;
      criteria[3].satisfied = true;
    } else {
      criteria[3].satisfied = false;
    }

    setPasswordStrength(strength);
    setPasswordCriteria(criteria);
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

  const typeText =
    currentUser && currentUser.type === 1 ? "ADMIN" : "VISUALIZADOR";
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
      <div className="d-flex gap-2 mt-2">
        <Button variant="secondary" onClick={logout}>
          Sair
        </Button>
        <Button className="text-white" onClick={toggleEditing}>
          {editingProfile ? "Cancelar Edição" : "Editar Perfil"}
        </Button>
      </div>
      {editingProfile ? (
        // Formulário de edição
        <Form onSubmit={handleSubmitUpdate(onSubmitUpdate)} className="pt-4">
          <FloatingLabel controlId="permited" label={typeText} className="mb-3">
            <Form.Control type="text" placeholder={typeText} disabled />
          </FloatingLabel>
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

          <FloatingLabel controlId="floatingDescription" label="Senha">
            <Form.Control
              type="password"
              placeholder="Senha"
              {...update("password", {
                onChange: (e) => calculatePasswordStrength(e.target.value),
              })}
              isInvalid={Boolean(formStateUpdate.errors.password)}
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
            <Button
              type="submit"
              className="text-white"
              disabled={disabledButton()}
            >
              Salvar Edições
            </Button>
          </div>
        </Form>
      ) : (
        // Formulário de visualização
        <Form className="pt-4">
          <FloatingLabel controlId="permited" label={typeText} className="mb-3">
            <Form.Control type="text" placeholder={typeText} disabled />
          </FloatingLabel>
          <FloatingLabel controlId="name" label="Nome" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nome"
              {...update("name")}
              isInvalid={Boolean(formStateUpdate.errors.name)}
              disabled
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

          <FloatingLabel controlId="floatingDescription" label="Senha">
            <Form.Control
              type="password"
              placeholder="Senha"
              {...update("password", {
                onChange: (e) => calculatePasswordStrength(e.target.value),
              })}
              isInvalid={Boolean(formStateUpdate.errors.password)}
              disabled
            />

            {formStateUpdate.errors.password && (
              <Form.Control.Feedback type="invalid">
                {formStateUpdate.errors.password.message}
              </Form.Control.Feedback>
            )}
          </FloatingLabel>
        </Form>
      )}
    </div>
  );
}
