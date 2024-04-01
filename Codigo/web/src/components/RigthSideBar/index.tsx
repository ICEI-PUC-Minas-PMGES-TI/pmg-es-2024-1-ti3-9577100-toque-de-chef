import { Container, Image } from "react-bootstrap";

export const RigthSidebar = () => {
  return (
    <Container
      className="pt-4 px-2  h-100"
      style={{ border: "1px solid #dddddd" }}
    >
      <Image
        src="/public/background.png"
        roundedCircle
        style={{ width: "42px", height: "42px", marginTop: "4px" }}
      />
      Usuario
    </Container>
  );
};
