import { createFileRoute } from "@tanstack/react-router";
import { PurchaseByDate } from "./_components/PurchaseByDate";
import Product from "./_components/Product";
import { PurchaseByMonth } from "./_components/PurchaseByMonth";

export const Route = createFileRoute("/dashboard/")({
  component: Index,
});

function Index() {
  return (
    <div style={{ padding: "24px", display: "grid", gap: "24px" }}>
      <PurchaseByMonth />

      <div style={{ height: "1px", backgroundColor: "#d7d8d7" }}></div>
      <PurchaseByDate />
      <div style={{ height: "1px", backgroundColor: "#d7d8d7" }}></div>
      <Product />
      <div style={{ height: "1px", backgroundColor: "#d7d8d7" }}></div>
    </div>
  );
}
export default Index;
