import { useEffect, useState } from "react";
import { Button, DropdownButton, Pagination, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { isKeyPressed } from "../../../helpers/Utils/Util";
import { DateRangeComponent } from "./DateRangeComponent";
import { useReadProductDashboard } from "../../../api/Dashboard/useReadProductDashboard";

const products = [];

const getYearRange = () => {
  const year = new Date().getFullYear();
  return {
    startDate: `${year}-01-01`,
    endDate: `${year}-12-31`,
  };
};

export function Product() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [, setCreateProductModal] = useState(false);

  const { handleSubmit, register, formState, getValues } = useForm();

  const { data: productDashboardData } = useReadProductDashboard(
    startDate,
    endDate,
    currentPage,
    itemsPerPage
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isKeyPressed(event, [{ key: "j", modifier: "Ctrl" }])) {
        setCreateProductModal(true);
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
    productDashboardData?.products.length || 0
  );
  const totalPages = Math.ceil(
    (productDashboardData?.products.length || 0) / itemsPerPage
  );

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
          <DateRangeComponent
            onDateChange={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
          />

          <div
            style={{ width: "340px" }}
            className="bg-light d-flex justify-content-end"
          >
            <Button
              variant="secondary"
              onClick={() => {
                const { startDate, endDate } = getYearRange();
                setStartDate(startDate);
                setEndDate(endDate);
              }}
            >
              Anual
            </Button>
          </div>
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
            {productDashboardData?.products
              .slice(startIndex, endIndex)
              .map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.entrada}</td>
                  <td>{product.saida}</td>
                  <td>{product.precoMedio}</td>
                  <td>{product.maiorPreco}</td>
                  <td>{product.menorPreco}</td>
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
