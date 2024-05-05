import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  Form,
  InputGroup,
  Pagination,
  Stack,
  Table,
} from "react-bootstrap";
import { useReadCategories } from "../../api/Category/useReadCategories";
import { PencilFill, Search, TrashFill } from "react-bootstrap-icons";
import { PlusCircle } from "react-bootstrap-icons";
import { UpdateCategoryModal } from "./_components/UpdateCategoryModal";
import { useSearchParam } from "../../hooks/useSearchParams";
import { DeleteCategoryModal } from "./_components/DeleteCategoryModal";
import { CreateCategoryModal } from "./_components/CreateCategoryModal";
import { useEffect } from "react";
import { isKeyPressed } from "../../helpers/Utils/Util";

export const Route = createFileRoute("/category/")({
  component: Index,
});
function Index() {
  const [, setCreateCategoryModal] = useSearchParam("createCategoryModal");
  const [, setUpdateCategoryModal] = useSearchParam("updateCategoryModal");
  const [, setDeleteCategoryModal] = useSearchParam("deleteCategoryModal");

  const { data: categoryData } = useReadCategories();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isKeyPressed(event, [{ key: "j", modifier: "Ctrl" }])) {
        setCreateCategoryModal("true");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setCreateCategoryModal]);

  return (
    <div className="m-4">
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">Categoria</div>
        <InputGroup className="p-2 me-auto w-8">
          <Form.Control
            placeholder="Pesquisar Categoria"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2">
            <Search />
          </Button>
        </InputGroup>
        <Button
          className="p-2 d-flex gap-2 align-items-center text-nowrap text-white"
          onClick={() => setCreateCategoryModal("true")}
        >
          <PlusCircle /> <strong>Adicionar novo categoria</strong>
        </Button>
      </Stack>
      <div className="p-1">
        <Table responsive>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Descrição</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {categoryData?.map((category, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td className="d-flex gap-2 ">
                  <Button
                    onClick={() =>
                      setUpdateCategoryModal(category.id.toString())
                    }
                    className="text-white"
                  >
                    <PencilFill />
                  </Button>
                  <Button
                    className="text-white"
                    onClick={() =>
                      setDeleteCategoryModal(category.id.toString())
                    }
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
          paddingTop: "16px",
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

      <CreateCategoryModal />
      <UpdateCategoryModal />
      <DeleteCategoryModal />
    </div>
  );
}
