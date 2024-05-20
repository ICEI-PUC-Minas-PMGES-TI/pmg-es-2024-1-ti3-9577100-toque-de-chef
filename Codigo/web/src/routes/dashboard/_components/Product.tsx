import { useEffect, useState } from "react";
import {
  Button,
  DropdownButton,
  Form,
  InputGroup,
  Pagination,
  Stack,
  Table,
} from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useSearchParam } from "../../../hooks/useSearchParams";
import { useReadProducts } from "../../../api/Product/useReadProducts";
import { isKeyPressed } from "../../../helpers/Utils/Util";
import { DateRangeComponent } from "./DateRangeComponent";

const schema = z.object({
  name: z.string({ required_error: "Obrigatório" }),
});

function Product() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10); // Definindo itemsPerPage
  const [, setCreateProductModal] = useSearchParam("createProductModal");

  const { handleSubmit, register, formState, getValues } =
    useForm<z.infer<typeof schema>>();

  const { data: productData } = useReadProducts(getValues("name"));

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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    productData?.obj?.length || 0
  );
  const totalPages = Math.ceil((productData?.obj?.length || 0) / itemsPerPage);
  const searchProdut = async () => {};

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "24px 0px",
        }}
      >
        <div className="p-2">Produtos</div>

        <DropdownButton
          id="dropdown-basic-button"
          title="Selecione o Período"
          className="text-white"
        >
          <DateRangeComponent />
        </DropdownButton>
      </div>

      <div
        className="p-1"
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "16px",
        }}
      >
        <Table responsive>
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Entrada</th>
              <th scope="col">Saída</th>
              <th scope="col">Preço Médio</th>
              <th scope="col">Maior Preço</th>
              <th scope="col">Menor Preço</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {productData?.obj
              ?.slice(startIndex, endIndex)
              .map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.stockQtd}</td>
                  <td>{product.stockQtd}</td>

                  <td>{product.stockQtd}</td>
                  <td>{product.stockQtd}</td>

                  <td>{product.stockQtd}</td>
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
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
          />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} />
        </Pagination>
      </div>
    </div>
  );
}
