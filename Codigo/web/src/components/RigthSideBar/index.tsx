import { Container, Dropdown } from "react-bootstrap";
import Cookies from "universal-cookie";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useCurrentUser } from "../../api/User/useCurrentUser";
import {
  PlusCircle,
  FileEarmarkArrowDown,
  FileEarmarkArrowUp,
} from "react-bootstrap-icons";
import { ROUTE_TO_NAME } from "../../helpers/Utils/Enum";
import IconUser from "../IconUser";
import { useQueryClient } from "@tanstack/react-query";
const cookies = new Cookies();

export const RigthSidebar = () => {
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser();

  const router = useRouterState();
  const routerName = ROUTE_TO_NAME[router.location.pathname];

  const navigate = useNavigate();

  const { data } = useCurrentUser();

  const logout = () => {
    navigate({
      to: "/",
    });
    cookies.remove("user");
    queryClient.removeQueries({
      queryKey: ["getCurrentUser"],
    });
  };

  const getProfile = () => {
    navigate({
      to: "/profile",
    });
  };
  const getAccessControl = () => {
    navigate({
      to: "/accessControl/",
    });
  };
  return (
    <Container
      className="pt-4 px-4  h-100"
      style={{ border: "1px solid #dddddd" }}
    >
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <IconUser tam="42px" fontSize="12px" />
        <div>Usuário: {data?.name}</div>

        <Dropdown>
          <Dropdown.Toggle></Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={getProfile}>Perfil</Dropdown.Item>

            {currentUser && currentUser.type !== 2 && (
              <Dropdown.Item onClick={getAccessControl}>
                Controle de Acesso
              </Dropdown.Item>
            )}

            <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {routerName != "Perfil" && (
        <div style={{ paddingTop: "36px" }} className="text-secondary">
          <h6>
            <strong>Atalhos Rápidos</strong>
          </h6>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 6fr",
              alignItems: "center",
              padding: "8px",
            }}
          >
            <PlusCircle /> Ctrl + J | Cadastrar {routerName}
            <FileEarmarkArrowDown /> Importar Planilha
            <FileEarmarkArrowUp /> Exportar Planilha
          </div>
        </div>
      )}
    </Container>
  );
};
