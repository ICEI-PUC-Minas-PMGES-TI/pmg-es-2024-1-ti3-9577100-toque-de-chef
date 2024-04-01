import { Container, Image, Dropdown } from "react-bootstrap";
import Cookies from "universal-cookie";
import { useNavigate } from "@tanstack/react-router";
import { useCurrentUser } from "../../api/User/useCurrentUser";
const cookies = new Cookies();

export const RigthSidebar = () => {
  const navigate = useNavigate();
  const { data } = useCurrentUser();
  const logout = () => {
    navigate({
      to: "/",
    });
    cookies.remove("user");
  };
  return (
    <Container
      className="pt-4 px-4  h-100"
      style={{ border: "1px solid #dddddd" }}
    >
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Image
          src="/public/background.png"
          roundedCircle
          style={{ width: "42px", height: "42px", marginTop: "4px" }}
        />
        <div>Usuário: {data?.name}</div>
        <Dropdown>
          <Dropdown.Toggle></Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Container>
  );
};
