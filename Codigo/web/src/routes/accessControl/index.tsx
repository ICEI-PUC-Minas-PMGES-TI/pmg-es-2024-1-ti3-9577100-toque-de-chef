import { Button, Card, Nav } from "react-bootstrap";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/accessControl/")({
  component: Index,
});

function Index() {
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
      >
        <Nav.Item>
          <Nav.Link eventKey="toAdd">Solicitações</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Visualizadores</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">ADMIN</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled">Negados</Nav.Link>
        </Nav.Item>
      </Nav>

      <div
        style={{
          paddingTop: "24px",
          gap: "16px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {/* <Card
          style={{
            padding: "16px",
            width: "max-content",
            height: "max-content",
          }}
        >
          <Card.Body>
            <Card.Title>Antônio</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              antonio@gmail.com
            </Card.Subtitle>

            <div
              style={{
                display: "flex",

                gap: "16px",
              }}
            >
              <Button className="text-white bg-secondary">Mudar para visualizador</Button>
              <Button className="text-white bg-primary">ADMIN</Button>
              <Button className="text-white bg-danger">Negar acesso</Button>
            </div>
          </Card.Body>
        </Card>
        <Card
          style={{
            padding: "16px",
            width: "max-content",
            height: "max-content",
          }}
        >
          <Card.Body>
            <Card.Title>Gabriel</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              gabriel@gmail.com
            </Card.Subtitle>

            <div
              style={{
                display: "flex",

                gap: "16px",
              }}
            >
              <Button className="text-white bg-secondary">Mudar para visualizador</Button>
              <Button className="text-white bg-primary">ADMIN</Button>
              <Button className="text-white bg-danger">Negar acesso</Button>
            </div>
          </Card.Body>
        </Card> */}
        <Card
          style={{
            padding: "16px",
            width: "max-content",
            height: "max-content",
          }}
        >
          <Card.Body>
            <Card.Title>Regina</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              regina@gmail.com
            </Card.Subtitle>

            <div
              style={{
                display: "flex",
                gap: "16px",
              }}
            >
              <Button className="text-white bg-secondary">
                Mudar para visualizador
              </Button>
              <Button className="text-white bg-primary">
                Mudar para ADMIN
              </Button>
              {/* <Button className="text-white bg-danger">Remover acesso</Button> */}
            </div>
          </Card.Body>
        </Card>
        <Card
          style={{
            padding: "16px",
            width: "max-content",
            height: "max-content",
          }}
        >
          <Card.Body>
            <Card.Title>Cleude</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              cleude@gmail.com
            </Card.Subtitle>

            <div
              style={{
                display: "flex",

                gap: "16px",
              }}
            >
              <Button className="text-white bg-secondary">
                Mudar para visualizador
              </Button>
              <Button className="text-white bg-primary">
                Mudar para ADMIN
              </Button>
              {/* <Button className="text-white bg-danger">Remover acesso</Button> */}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
