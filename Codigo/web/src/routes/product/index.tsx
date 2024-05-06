import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Pagination,
  Stack,
  Table,
} from "react-bootstrap";
import {
  FileEarmarkArrowDown,
  FileEarmarkArrowUp,
  PencilFill,
  Search,
  Trash,
  TrashFill,
} from "react-bootstrap-icons";
import { PlusCircle } from "react-bootstrap-icons";
import { UpdateProductModal } from "./_components/UpdateProductModal";
import { useSearchParam } from "../../hooks/useSearchParams";
import { DeleteProductModal } from "./_components/DeleteProductModal";
import { CreateProductModal } from "./_components/CreateProductModal";
import { useReadProducts } from "../../api/Product/useReadProducts";
<<<<<<< HEAD
import { isKeyPressed } from "../../helpers/Utils/Util";
import { createFileRoute } from "@tanstack/react-router";
=======
import { useEffect, useState } from "react";
import { isKeyPressed } from "../../helpers/Utils/Util";
import { useCurrentUser } from "../../api/User/useCurrentUser";
import { useFilteredProduct } from "../../api/Product/useFilteredProduct";
import { z } from "zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  name: z.string({ required_error: "Obrigatório" }),
});
>>>>>>> 21fad159a9a323a9d02949eafddca2ec07ea8f79

export const Route = createFileRoute("/product/")({
  component: Index,
});

function Index() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10); // Definindo itemsPerPage
  const [, setCreateProductModal] = useSearchParam("createProductModal");
  const [, setUpdateProductModal] = useSearchParam("updateProductModal");
  const [, setDeleteProductModal] = useSearchParam("deleteProductModal");

  const { handleSubmit, register, formState, getValues, setValue } =
    useForm<z.infer<typeof schema>>();

  const { data: currentUser } = useCurrentUser();

  const { data: productData, refetch } = useReadProducts(getValues("name"));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isKeyPressed(event, [{ key: "j", modifier: "Ctrl" }])) {
        setCreateProductModal("true");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setCreateProductModal]);

<<<<<<< HEAD
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, productData?.obj?.length || 0);
  const totalPages = Math.ceil((productData?.obj?.length || 0) / itemsPerPage);
=======
  const searchProdut = async () => {};
>>>>>>> 21fad159a9a323a9d02949eafddca2ec07ea8f79

  return (
    <div className="m-4">
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">Produto</div>
        <Form onSubmit={handleSubmit(searchProdut)}>
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
              onClick={() => setCreateProductModal("true")}
            >
              <PlusCircle /> <strong>Cadastrar Novo Produto</strong>
            </Button>

            <Button
              className="p-2 d-flex gap-2 align-items-center text-nowrap text-white"
              disabled
            >
              <FileEarmarkArrowDown />
              <strong>Importar Planilha</strong>
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
        <Table responsive>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Descrição</th>
              <th scope="col">Categoria</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {productData?.obj?.slice(startIndex, endIndex).map((product, index) => (
              <tr key={index}>
                <th scope="row">{startIndex + index + 1}</th>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category.name}</td>
                {currentUser && currentUser.type !== 2 && (
                  <td className="d-flex gap-2 ">
                    <Button
                      onClick={() =>
                        setUpdateProductModal(product.id.toString())
                      }
                      className="text-white"
                    >
                      <PencilFill />
                    </Button>
                    <Button
                      className="text-white"
                      onClick={() =>
                        setDeleteProductModal(product.id.toString())
                      }
                    >
                      <TrashFill />
                    </Button>
                  </td>
                )}
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

      <CreateProductModal />
      <UpdateProductModal />
      <DeleteProductModal />
    </div>
  );
}

export default Index;
