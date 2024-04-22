import { createFileRoute } from "@tanstack/react-router";
import { Accordion, Button, Form, InputGroup, Stack } from "react-bootstrap";
import {
  Box,
  FileEarmarkArrowUp,
  Search,
  CurrencyDollar,
  Diamond,
  Clipboard,
  CashCoin,
} from "react-bootstrap-icons";
import { PlusCircle } from "react-bootstrap-icons";
import { UpdatePurchaseModal } from "./_components/UpdatePurchaseModal";
import { useSearchParam } from "../../hooks/useSearchParams";
import { CreatePurchaseModal } from "./_components/CreatePurchaseModal";
import { useReadPurchases } from "../../api/Purchase/useReadPurchases";
import { Purchase } from "../../types/purchase";
import { useEffect } from "react";
import { isKeyPressed } from "../../helpers/Utils/Util";

export const Route = createFileRoute("/purchase/")({
  component: Index,
});

function Index() {
  const [, setCreatePurchaseModal] = useSearchParam("createPurchaseModal");

  const { data: purchaseData } = useReadPurchases(null);

  function formatPurchaseDate(date) {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleString("pt-BR", options);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isKeyPressed(event, [{ key: "j", modifier: "Ctrl" }])) {
        setCreatePurchaseModal("true");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setCreatePurchaseModal]);

  return (
    <div className="m-4">
      <Stack direction="horizontal" gap={3}>
        <InputGroup className="p-2 me-auto w-8">
          <Form.Control
            placeholder="Pesquisar compra"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2">
            <Search />
          </Button>
        </InputGroup>
        <Button
          className="p-2 d-flex gap-2 align-items-center text-nowrap text-white"
          onClick={() => setCreatePurchaseModal("true")}
        >
          <PlusCircle /> <strong>Cadastrar Nova Compra</strong>
        </Button>

        <Button
          className="p-2 d-flex gap-2 align-items-center text-nowrap text-white"
          disabled
        >
          <FileEarmarkArrowUp />
          <strong>Exportar Planilha</strong>
        </Button>
      </Stack>
      <div className="p-1">
        <Accordion>
          {purchaseData?.obj?.map((purchase: Purchase, index: number) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>
                {formatPurchaseDate(purchase.purchaseDate)} -{" "}
                {purchase.suplyer.name}
              </Accordion.Header>
              <Accordion.Body>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "16px",
                  }}
                >
                  {purchase?.purchaseItems.map((item, index2) => (
                    <div
                      key={index2}
                      style={{
                        display: "grid",
                        justifyContent: "center",
                        gap: "16px",
                        boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px",
                        padding: "16px",
                      }}
                    >
                      <div>
                        <Box /> Nome: {item.product.name}
                      </div>
                      <div>
                        <Clipboard /> Categoria:{" "}
                        {item?.product?.category?.name || "tempero"}
                      </div>
                      <div>
                        <CurrencyDollar /> Preço Unitário: {item.unitPrice}
                      </div>
                      <div>
                        <Diamond /> Quantidade: {item.quantity}
                      </div>
                      <div>
                        {" "}
                        <CashCoin /> Preço Total:
                        {item.quantity * item.unitPrice}
                      </div>
                    </div>
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>

      <CreatePurchaseModal />
      <UpdatePurchaseModal />
    </div>
  );
}

export default Index;
