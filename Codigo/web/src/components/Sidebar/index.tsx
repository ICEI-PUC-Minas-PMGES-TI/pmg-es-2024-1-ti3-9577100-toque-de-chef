import { Container } from "react-bootstrap";
import { useRouterState, Link } from "@tanstack/react-router";

import "./styles.scss";
import {
  BorderAll,
  Box,
  Coin,
  Diamond,
  GearWide,
  GraphUpArrow,
  InfoCircle,
  Truck,
} from "react-bootstrap-icons";

const routesGeneral = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <BorderAll />,
  },
  {
    name: "Compra",
    path: "/purchase",
    icon: <Coin />,
  },
  {
    name: "Produto",
    path: "/product",
    icon: <Box />,
  },
  {
    name: "Fornecedor",
    path: "/suplyer",
    icon: <Truck />,
  },
  {
    name: "Categoria",
    path: "/category",
    icon: <Diamond />,
  },
  {
    name: "Relatórios",
    path: "/relatorio",
    icon: <GraphUpArrow />,
  },
];

const routesSupport = [
  {
    name: "Ajuda",
    path: "/ajuda",
    icon: <InfoCircle />,
  },
  {
    name: "Configurações",
    path: "/configuracoes",
    icon: <GearWide />,
  },
];

export const Sidebar = () => {
  const router = useRouterState();

  return (
    <Container className="pt-4 px-5 container-sidebar">
      <div>
        <h6 className="text-secondary">
          <strong>GERAL</strong>
        </h6>
        <ul className="sidebar-list">
          {routesGeneral.map((route) => (
            <Link key={route.path} to={route.path}>
              {route.icon} {route.name}
            </Link>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <h6 className="text-secondary">
          <strong>SUPORTE</strong>
        </h6>
        <ul className="sidebar-list">
          {routesSupport.map((route) => (
            <li
              key={route.path}
              className={`${router.location.href.includes(route.path) ? "active" : ""} `}
            >
              {route.icon} {route.name}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};
