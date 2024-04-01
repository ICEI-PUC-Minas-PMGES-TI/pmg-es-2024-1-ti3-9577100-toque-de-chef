import { Container, Image } from "react-bootstrap";

export const RigthSidebar = () => {
  return (
    <Container
      className="pt-4 px-5  h-100"
      style={{ border: "1px solid #dddddd" }}
    >
      <Image
        src="/public/background.png"
        roundedCircle
        style={{ width: "50px", height: "50px" }}
      />
      Usuario
    </Container>
  );
};
