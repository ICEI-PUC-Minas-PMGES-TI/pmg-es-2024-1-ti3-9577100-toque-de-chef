import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, Image, Alert } from "react-bootstrap";
import { useCurrentUser } from "../../api/User/useCurrentUser";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Route = createFileRoute("/awaiting-system-access/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const { data: currentUser, refetch } = useCurrentUser();
  const queryClient = useQueryClient();

  const [alertVariant, setAlertVariant] = useState(""); // Estado para controlar a variante do alerta
  const [showAlert, setShowAlert] = useState(false); // Estado para controlar a exibição do alerta

  const redirectToProductPage = useCallback(async () => {
    if (currentUser?.type === 1 || currentUser?.type === 2) {
      navigate({ to: "/product" });
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    redirectToProductPage();
  }, [redirectToProductPage]);

  const logout = () => {
    navigate({
      to: "/",
    });
    cookies.remove("user");
    queryClient.removeQueries({
      queryKey: ["getCurrentUser"],
    });
  };

  const handleButtonClick = async () => {
    const newUser = await refetch();

    if (newUser.data) {
      if (newUser.data.type === 3) {
        setAlertVariant("warning");
        setShowAlert(true);
      } else if (newUser.data.type === 4) {
        setAlertVariant("danger");
        setShowAlert(true);
      } else {
        redirectToProductPage();
      }
    }
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
          width: "100vw",
          display: "flex",
          gap: "48px",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.8)",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Image style={{ height: "140px" }} src={"/public/logo.png"} />
        <h1
          style={{
            fontSize: "60px",
          }}
        >
          Solicitação de cadastro
        </h1>
        <h1
          style={{
            fontSize: "44px",
          }}
        >
          enviada com sucesso!
        </h1>

        <h4>O prazo de resposta costuma ser em 24 horas</h4>

        <div className="d-flex gap-2 mt-2">
          <Button variant="secondary" onClick={logout}>
            Sair (Voltar ao Login)
          </Button>
          <Button
            variant="primary"
            className="text-white"
            onClick={handleButtonClick}
          >
            Tentar Acesso
          </Button>
        </div>

        {/* Alerta para exibir mensagem com base no tipo de usuário */}
        {showAlert && (
          <Alert
            variant={alertVariant}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {currentUser?.type === 3
              ? "Aguarde mais um pouco!"
              : "Acesso negado"}
          </Alert>
        )}
      </div>
    </div>
  );
}
