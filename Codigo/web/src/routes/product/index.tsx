import { createFileRoute } from "@tanstack/react-router";
import { Button, Form, InputGroup, Stack, Table } from "react-bootstrap";
import { PencilFill, Search, TrashFill } from "react-bootstrap-icons";
import { PlusCircle } from "react-bootstrap-icons";
import { UpdateProductModal } from "./_components/UpdateProductModal";
import { useSearchParam } from "../../hooks/useSearchParams";
import { DeleteProductModal } from "./_components/DeleteProductModal";
import { CreateProductModal } from "./_components/CreateProductModal";
import { useReadProducts } from "../../api/Product/useReadProducts";
import { useEffect } from "react";
import { isKeyPressed } from "../Utils/Util";
import { useCreateProduct } from "../../api/Product/useCreateProduct";

export const Route = createFileRoute("/product/")({
  component: Index,
});

function Index() {
  const [, setCreateProductModal] = useSearchParam("createProductModal");
  const [, setUpdateProductModal] = useSearchParam("updateProductModal");
  const [, setDeleteProductModal] = useSearchParam("deleteProductModal");

  const { data: productData } = useReadProducts(null);

  console.log("productData", productData);

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
          onClick={() => setCreateProductModal("true")}
        >
          <PlusCircle /> <strong>Adicionar novo produto</strong>
        </Button>
      </Stack>
      <div className="p-1">
        <Table responsive>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {productData?.obj?.map((product, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{product.name}</td>
                <td>{product.unitPrice}</td>
                <td>{product.description}</td>

                <td>{product.category.name}</td>
                <td className="d-flex gap-2 ">
                  <Button
                    onClick={() => setUpdateProductModal(product.id.toString())}
                    className="text-white"
                  >
                    <PencilFill />
                  </Button>
                  <Button
                    className="text-white"
                    onClick={() => setDeleteProductModal(product.id.toString())}
                  >
                    <TrashFill />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <CreateProductModal />
      <UpdateProductModal />
      <DeleteProductModal />
    </div>
  );
}
