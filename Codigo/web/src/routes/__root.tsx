import {
  createRootRoute,
  Outlet,
  useRouterState,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { Image } from "react-bootstrap";
import { Sidebar } from "../components/Sidebar";
import { RigthSidebar } from "../components/RigthSideBar";
import Cookies from "universal-cookie";
import { useCurrentUser } from "../api/User/useCurrentUser";
import { useEffect } from "react";

const cookies = new Cookies();

// Componente de rota raiz
export const Route = createRootRoute({
  component: Root,
  beforeLoad: async ({ location }) => {
    if (!cookies.get("user") && !excludedNavBarRoutes.includes(location.href)) {
      throw redirect({
        to: "/",
      });
    }
  },
});

const excludedNavBarRoutes = [
  "/",
  "/login",
  "/registration",
  "/awaiting-system-access/",
];

function Root() {
  const router = useRouterState();
  const navigate = useNavigate();
  const { data: currentUser } = useCurrentUser({
    enabled: false,
  });

  useEffect(() => {
    console.log("currentUser", currentUser);
    if (currentUser?.type === 2) {
      const userRoutes = ["/product", "/profile"];
      console.log("user", !userRoutes.includes(router.location.href));
      console.log("router.location.href", router.location.href);
      if (!userRoutes.includes(router.location.href)) {
        navigate({
          to: "/product",
        });
      }
    }
  }, [router.location.href, currentUser]);

  const isLoggedRoutes = excludedNavBarRoutes.includes(router.location.href);

  if (isLoggedRoutes) {
    return <Outlet />;
  }

  return (
    <>
      <div className="layout">
        <div className="header">
          <Image
            style={{ width: "132px", height: "74px" }}
            src={"/public/logo.png"}
          />
        </div>
        <Sidebar />
        <div>
          <Outlet />
        </div>
        <div>
          <RigthSidebar />
        </div>
        <div className="footer">Footer</div>
      </div>
    </>
  );
}
