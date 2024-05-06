import {
  Accordion,
  Button,
  Form,
  InputGroup,
  Pagination,
  Stack,
} from "react-bootstrap";
import {
  Box,
  FileEarmarkArrowUp,
  Search,
  CurrencyDollar,
  Diamond,
  Clipboard,
  CashCoin,
  PencilFill,
} from "react-bootstrap-icons";
import { PlusCircle } from "react-bootstrap-icons";
import { UpdatePurchaseModal } from "./_components/UpdatePurchaseModal";
import { useSearchParam } from "../../hooks/useSearchParams";
import { CreatePurchaseModal } from "./_components/CreatePurchaseModal";
import { useReadPurchases } from "../../api/Purchase/useReadPurchases";
import { Purchase } from "../../types/purchase";
import { isKeyPressed } from "../../helpers/Utils/Util";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useCurrentUser } from "../../api/User/useCurrentUser";
import { z } from "zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  name: z.string({ required_error: "Obrigatório" }),
});

export const Route = createFileRoute("/purchase/")({
  component: Index,
});

function Index() {
  const [, setCreatePurchaseModal] = useSearchParam("createPurchaseModal");
  const [, setUpdatePurchaseModal] = useSearchParam("updatePurchaseModal");

  const { handleSubmit, register, formState, getValues } =
    useForm<z.infer<typeof schema>>();

  const { data: purchaseData } = useReadPurchases(getValues("name"));

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

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

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

  // Pagination handlers
  const handlePaginationNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePaginationPrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    purchaseData?.obj?.length || 0
  );

  const { data: currentUser } = useCurrentUser();

  const searchSuplyer = async () => {};

  return (
    <div className="m-4">
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">Compras</div>
        <Form onSubmit={handleSubmit(searchSuplyer)}>
          <InputGroup className="p-2 me-auto w-8">
            <Form.Control
              type="text"
              placeholder="Pesquisar Produto"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              {...register("name")}
              isInvalid={Boolean(formState.errors.name)}
            />

            {formState.errors.name && (
              <Form.Control.Feedback type="invalid">
                {formState.errors.name.message}
              </Form.Control.Feedback>
            )}
            <Button
              variant="outline-secondary"
              id="button-addon2"
              type="submit"
            >
              <Search />
            </Button>
            {/* <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={async () => {
                await setValue("name", "");
                await refetch();
              }}
            >
              <Trash />
            </Button> */}
          </InputGroup>
        </Form>
        {currentUser && currentUser.type !== 2 && (
          <>
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
          </>
        )}
      </Stack>
      <div className="p-1">
        <Accordion>
          {purchaseData?.obj
            ?.slice(startIndex, endIndex)
            .map((purchase: Purchase, index: number) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>
                  <div className="d-flex align-items-center justify-content-between w-100 pe-4">
                    <div>
                      {formatPurchaseDate(purchase.purchaseDate)} -{" "}
                      {purchase.suplyer.name}
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Button
                    className="text-white mb-2"
                    onClick={() =>
                      setUpdatePurchaseModal(purchase.id.toString())
                    }
                  >
                    Editar Compra <PencilFill />
                  </Button>
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

      {/* Pagination component */}
      <div
        style={{
          display: "grid",
          gap: "16px",
          paddingTop: "16px",
          justifyContent: "center",
        }}
      >
        <Pagination>
          <Pagination.First onClick={() => setCurrentPage(1)} />
          <Pagination.Prev onClick={handlePaginationPrev} />
          {[
            ...Array(
              Math.ceil((purchaseData?.obj?.length || 0) / itemsPerPage)
            ).keys(),
          ].map((page) => (
            <Pagination.Item
              key={page}
              active={page + 1 === currentPage}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={handlePaginationNext} />
          <Pagination.Last
            onClick={() =>
              setCurrentPage(
                Math.ceil((purchaseData?.obj?.length || 0) / itemsPerPage)
              )
            }
          />
        </Pagination>
      </div>

      <CreatePurchaseModal />
      <UpdatePurchaseModal />
    </div>
  );
}

export default Index;
