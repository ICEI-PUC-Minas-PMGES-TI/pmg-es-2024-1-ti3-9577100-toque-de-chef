import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Image } from "react-bootstrap";
import { Sidebar } from "../components/Sidebar";
import { useRouterState, redirect } from "@tanstack/react-router";
import Cookies from "universal-cookie";
import { RigthSidebar } from "../components/RigthSideBar";
const cookies = new Cookies();

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

const excludedNavBarRoutes = ["/", "/login", "/registration"];
function Root() {
  const router = useRouterState();

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
