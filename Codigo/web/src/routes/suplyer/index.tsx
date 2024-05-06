import {
  Button,
  Form,
  InputGroup,
  Pagination,
  Stack,
  Table,
} from "react-bootstrap";
import { useReadSuplyers } from "../../api/Suplyer/useReadSuplyers";
import { PencilFill, Search, TrashFill } from "react-bootstrap-icons";
import { PlusCircle } from "react-bootstrap-icons";
import { UpdateSuplyerModal } from "./_components/UpdateSuplyerModal";
import { useSearchParam } from "../../hooks/useSearchParams";
import { DeleteSuplyerModal } from "./_components/DeleteSuplyerModal";
import { CreateSuplyerModal } from "./_components/CreateSuplyerModal";
import { isKeyPressed } from "../../helpers/Utils/Util";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/suplyer/")({
  component: Index,
});

function Index() {
  const [, setCreateSuplyerModal] = useSearchParam("createSuplyerModal");
  const [, setUpdateSuplyerModal] = useSearchParam("updateSuplyerModal");
  const [, setDeleteSuplyerModal] = useSearchParam("deleteSuplyerModal");

  const { data: suplyerData } = useReadSuplyers();

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isKeyPressed(event, [{ key: "j", modifier: "Ctrl" }])) {
        setCreateSuplyerModal("true");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setCreateSuplyerModal]);

  // Pagination handlers
  const handlePaginationNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePaginationPrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Calculate start and end index for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, suplyerData?.length || 0);

  return (
    <div className="m-4">
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">Fornecedor</div>
        <InputGroup className="p-2 me-auto w-8">
          <Form.Control
            placeholder="Pesquisar Fornecedor"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2">
            <Search />
          </Button>
        </InputGroup>
        <Button
          className="p-2 d-flex gap-2 align-items-center text-nowrap text-white"
          onClick={() => setCreateSuplyerModal("true")}
        >
          <PlusCircle /> <strong>Adicionar novo fornecedor</strong>
        </Button>
      </Stack>
      <div className="p-1">
        <Table responsive>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Contato</th>
              <th scope="col">Descrição</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {suplyerData?.slice(startIndex, endIndex).map((suplyer, index) => (
              <tr key={index}>
                <th scope="row">{startIndex + index + 1}</th>
                <td>{suplyer.name}</td>
                <td>{suplyer.email}</td>
                <td>{suplyer.phone}</td>
                <td>{suplyer.description}</td>
                <td className="d-flex gap-2 ">
                  <Button
                    onClick={() => setUpdateSuplyerModal(suplyer.id.toString())}
                    className="text-white"
                  >
                    <PencilFill />
                  </Button>
                  <Button
                    className="text-white"
                    onClick={() => setDeleteSuplyerModal(suplyer.id.toString())}
                  >
                    <TrashFill />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination component */}
      <div
        style={{
          display: "grid",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        <Pagination>
          <Pagination.First onClick={() => setCurrentPage(1)} />
          <Pagination.Prev onClick={handlePaginationPrev} />
          {[...Array(Math.ceil((suplyerData?.length || 0) / itemsPerPage)).keys()].map((page) => (
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
              setCurrentPage(Math.ceil((suplyerData?.length || 0) / itemsPerPage))
            }
          />
        </Pagination>
      </div>

      <CreateSuplyerModal />
      <UpdateSuplyerModal />
      <DeleteSuplyerModal />
    </div>
  );
}

export default Index;
