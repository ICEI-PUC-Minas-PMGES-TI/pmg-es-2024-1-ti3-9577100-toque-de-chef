import { createFileRoute } from "@tanstack/react-router";
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
import { useEffect } from "react";
import { isKeyPressed } from "../../helpers/Utils/Util";

export const Route = createFileRoute("/suplyer/")({
  component: Index,
});

function Index() {
  const [, setCreateSuplyerModal] = useSearchParam("createSuplyerModal");
  const [, setUpdateSuplyerModal] = useSearchParam("updateSuplyerModal");
  const [, setDeleteSuplyerModal] = useSearchParam("deleteSuplyerModal");

  const { data: suplyerData } = useReadSuplyers();

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
            {suplyerData?.map((suplyer, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
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

      <div
        style={{
          display: "grid",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item> {1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active className="bg-primary">
            {12}
          </Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item disabled>{14}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>

      <CreateSuplyerModal />
      <UpdateSuplyerModal />
      <DeleteSuplyerModal />
    </div>
  );
}
