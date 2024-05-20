import { Button, Card, Nav } from "react-bootstrap";
import { createFileRoute } from "@tanstack/react-router";
import { useReadUsersByType } from "../../api/User/useReadUsersByType";
import { useState, useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateUserType } from "../../api/User/useUpdateUserType";
import { UserInfoType } from "../../types/user";

export const Route = createFileRoute("/accessControl/")({
  component: Index,
});

function Index() {
  const [activeTab, setActiveTab] = useState<string | null>();

  const type = useCallback(() => {
    switch (activeTab) {
      case "1":
        return 1;
      case "2":
        return 2;
      case "3":
        return 3;
      default:
        return 4;
    }
  }, [activeTab]);

  const formatText = () => {
    let butao1 = { text: "", value: 0 };
    let butao2 = { text: "", value: 0 };

    switch (activeTab) {
      case "3":
        butao1 = { text: "tornar Visualizador", value: 2 };
        butao2 = { text: "tornar Admin", value: 1 };
        break;
      case "2":
        butao1 = { text: "Negar Acesso Total", value: 4 };
        butao2 = { text: "tornar Admin", value: 1 };
        break;
      case "1":
        butao1 = { text: "Negar Acesso Total", value: 4 };
        butao2 = { text: "tornar Visualizador", value: 2 };
        break;
      default:
        butao1 = { text: "tornar Visualizador", value: 2 };
        butao2 = { text: "tornar Admin", value: 1 };
    }
    return { butao1, butao2 };
  };

  const { data, isLoading, isError, refetch } = useReadUsersByType(type());
  const queryClient = useQueryClient();

  const { mutateAsync } = useUpdateUserType({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readUsersByType"],
      });
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["readUsersByType"],
      });
    },
  });

  const onSubmitUpdate = async (data: { id: number; type: number }) => {
    await mutateAsync({
      user: {
        id: data.id,
        type: data.type,
      },
    });
  };

  const handleTabChange = (eventKey: string | null) => {
    setActiveTab(eventKey);
  };

  const buttonText = formatText();

  const handleButtonClick = (user: UserInfoType, button: number) => {
    onSubmitUpdate({
      id: user.id,
      type: button,
    });
  };

  useEffect(() => {
    if (type()) {
      refetch();
    }
  }, [refetch, type]);

  return (
    <div
      style={{
        padding: "24px",
        margin: "48px",
        gap: "16px",
      }}
    >
      <h3>Controle de Acesso</h3>

      <Nav
        fill
        variant="tabs"
        className="color-primary"
        activeKey={activeTab || "3"}
        onSelect={handleTabChange}
      >
        <Nav.Item>
          <Nav.Link eventKey="3">Solicitações</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2">Visualizadores</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="1">ADMIN</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="4">Negados</Nav.Link>
        </Nav.Item>
      </Nav>

      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error occurred</div>
      ) : (
        <div
          style={{
            paddingTop: "24px",
            gap: "16px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            height: "600px",
            overflowY: "auto",
          }}
        >
          {data &&
            data.map((user, index) => (
              <Card
                key={`${user.email}${index}`}
                style={{
                  padding: "16px",
                  width: "max-content",
                  height: "max-content",
                }}
              >
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {user.email}
                  </Card.Subtitle>
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                    }}
                  >
                    <Button
                      className="text-white bg-secondary"
                      onClick={() =>
                        handleButtonClick(user, buttonText.butao1.value)
                      }
                    >
                      {buttonText.butao1.text}
                    </Button>
                    <Button
                      className="text-white bg-primary"
                      onClick={() =>
                        handleButtonClick(user, buttonText.butao2.value)
                      }
                    >
                      {buttonText.butao2.text}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}

export default Index;
