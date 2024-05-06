import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Pagination,
  Stack,
  Table,
} from "react-bootstrap";
import { PencilFill, Search, TrashFill } from "react-bootstrap-icons";
import { PlusCircle } from "react-bootstrap-icons";
import { useReadCategories } from "../../api/Category/useReadCategories";
import { useSearchParam } from "../../hooks/useSearchParams";
import { isKeyPressed } from "../../helpers/Utils/Util";
import { createFileRoute } from "@tanstack/react-router";
import { CreateCategoryModal } from "./_components/CreateCategoryModal";
import { DeleteCategoryModal } from "./_components/DeleteCategoryModal";
import { UpdateCategoryModal } from "./_components/UpdateCategoryModal";

export const Route = createFileRoute("/category/")({
  component: Index,
});

function Index() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, categoryData?.length || 0);
  const totalPages = Math.ceil((categoryData?.length || 0) / itemsPerPage);

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
            {categoryData?.slice(startIndex, endIndex).map((category, index) => (
              <tr key={index}>
                <th scope="row">{startIndex + index + 1}</th>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td className="d-flex gap-2 ">
                  <Button
                    onClick={() => setUpdateCategoryModal(category.id.toString())}
                    className="text-white"
                  >
                    <PencilFill />
                  </Button>
                  <Button
                    className="text-white"
                    onClick={() => setDeleteCategoryModal(category.id.toString())}
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
          <Pagination.First onClick={() => handlePageChange(1)} />
          <Pagination.Prev
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          />
          {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item
              key={page}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} />
        </Pagination>
      </div>

      <CreateCategoryModal />
      <UpdateCategoryModal />
      <DeleteCategoryModal />
    </div>
  );
}

export default Index;
