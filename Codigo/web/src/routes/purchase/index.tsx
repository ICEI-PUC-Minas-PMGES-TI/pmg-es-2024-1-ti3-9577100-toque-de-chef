import { createFileRoute } from "@tanstack/react-router";
import { Accordion, Button, Form, InputGroup, Stack } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { PlusCircle } from "react-bootstrap-icons";
import { UpdatePurchaseModal } from "./_components/UpdatePurchaseModal";
import { useSearchParam } from "../../hooks/useSearchParams";
import { CreatePurchaseModal } from "./_components/CreatePurchaseModal";
import { useReadPurchases } from "../../api/Purchase/useReadPurchases";

export const Route = createFileRoute("/purchase/")({
  component: Index,
});

function Index() {
  const [, setCreatePurchaseModal] = useSearchParam("createPurchaseModal");

  const { data: purchaseData } = useReadPurchases(null);

  return (
    <div className="m-4">
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">Produto</div>
        <InputGroup className="p-2 me-auto w-8">
          <Form.Control
            placeholder="Pesquisar Produto"
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
      </Stack>
      <div className="p-1">
        <Accordion>
          {purchaseData?.obj?.map((purchase, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>
                {purchase.purchaseDate.toString()} - {purchase.suplyer.name}
              </Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
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
