import { createFileRoute } from "@tanstack/react-router";
import { Button, Form, InputGroup, Stack, Table } from "react-bootstrap";
import { useReadCategories } from "../../api/Category/useReadCategories";
import { PencilFill, Search, TrashFill } from "react-bootstrap-icons";
import { PlusCircle } from "react-bootstrap-icons";
import { UpdateCategoryModal } from "./_components/UpdateCategoryModal";
import { useSearchParam } from "../../hooks/useSearchParams";
import { DeleteCategoryModal } from "./_components/DeleteCategoryModal";
import { CreateCategoryModal } from "./_components/CreateCategoryModal";
import { useEffect } from "react";
import { isKeyPressed } from "../Utils/Util";
import { useCreateCategory } from "../../api/Category/useCreateCategory";

export const Route = createFileRoute("/category/")({
  component: Index,
});
function Index() {
  const [, setCreateCategoryModal] = useSearchParam("createCategoryModal");
  const [, setUpdateCategoryModal] = useSearchParam("updateCategoryModal");
  const [, setDeleteCategoryModal] = useSearchParam("deleteCategoryModal");

  const { data: categoryData } = useReadCategories();

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

      <CreateCategoryModal />
      <UpdateCategoryModal />
      <DeleteCategoryModal />
    </div>
  );
  useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (isKeyPressed(event, [{ key: 'p', modifier: 'Ctrl' }])) {
      setCreateCategoryModal("true");
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [useCreateCategory]);
}
