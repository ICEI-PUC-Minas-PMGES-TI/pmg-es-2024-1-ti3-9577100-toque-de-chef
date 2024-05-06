import { Button, Card, Nav } from "react-bootstrap";
import { createFileRoute } from "@tanstack/react-router";
import { useReadUsersByType } from "../../api/User/useReadUsersByType";
import { useState } from "react";

export const Route = createFileRoute("/accessControl/")({
  component: Index,
});

function Index() {
  const [activeTab, setActiveTab] = useState("1");
  //bem bugado nao altera de acordo com a tab e ainda falta implementar a logica de dar a permissao ou nao
  const type = () => {
    if (activeTab === "1") {
      return 1;
    } else if (activeTab === "2") {
      return 2;
    } else if (activeTab === "3") {
      return 3;
    } else {
      return 4;
    }
  };

  const formatText = () => {
    let butao1 = "";
    let butao2 = "";
    if (activeTab === "1") {
      butao1 = "tornar Visualizador";
      butao2 = "tornar Admin";
    } else if (activeTab === "2") {
      butao1 = "Negar Acesso Total";
      butao2 = "tornar Admin";
    } else if (activeTab === "3") {
      butao1 = "Negar Acesso Total";
      butao2 = "tornar Visualizador";
    } else {
      butao1 = "tornar Visualizador";
      butao2 = "tornar Admin";
    }
    return { butao1, butao2 };
  };

  const { data, isLoading, isError, refetch } = useReadUsersByType(type());

  const handleTabChange = (eventKey) => {
    setActiveTab(eventKey);
    refetch();
  };

  const buttonText = formatText();

  return (
    <div
      style={{
        padding: "24px",
        margin: "48px",
        gap: "16px",
        height: "100%",
      }}
    >
      <h3>Controle de Acesso</h3>

      <Nav
        fill
        variant="tabs"
        defaultActiveKey="toAdd"
        className="color-primary"
        activeKey={activeTab}
        onSelect={handleTabChange}
      >
        <Nav.Item>
          <Nav.Link eventKey="1">Solicitações</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2">Visualizadores</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="3">ADMIN</Nav.Link>
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
          }}
        >
          {data &&
            data.map((user) => (
              <Card
                key={`${user.email}+${user.name}+${user.type}+`}
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
                    <Button className="text-white bg-secondary">
                      {buttonText.butao1}
                    </Button>
                    <Button className="text-white bg-primary">
                      {buttonText.butao2}
                    </Button>
                    {/* <Button className="text-white bg-danger">Remover acesso</Button> */}
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
