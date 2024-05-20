import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Pagination,
  Stack,
  Table,
  Spinner,
} from "react-bootstrap";
import {
  FileEarmarkArrowDown,
  PencilFill,
  Search,
  TrashFill,
} from "react-bootstrap-icons";
import { PlusCircle } from "react-bootstrap-icons";
import { UpdateProductModal } from "./_components/UpdateProductModal";
import { useSearchParam } from "../../hooks/useSearchParams";
import { DeleteProductModal } from "./_components/DeleteProductModal";
import { CreateProductModal } from "./_components/CreateProductModal";
import { useReadProducts } from "../../api/Product/useReadProducts";
import { useUpdateProduct } from "../../api/Product/useUpdateProduct";
import { createFileRoute } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { isKeyPressed } from "../../helpers/Utils/Util";
import { getDirtyValues } from "../../helpers/hook-form";
import { useCurrentUser } from "../../api/User/useCurrentUser";
import { z } from "zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  name: z.string({ required_error: "Obrigatório" }),
  products: z.array(
    z.object({
      id: z.number(),
      stockQtd: z.number(),
      name: z.string(),
      description: z.string(),
      category: z.object({
        name: z.string(),
      }),
    })
  ),
});

type Schema = z.infer<typeof schema>;

export const Route = createFileRoute("/product/")({
  component: Index,
});

function Index() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10); // Definindo itemsPerPage
  const [, setCreateProductModal] = useSearchParam("createProductModal");
  const [, setUpdateProductModal] = useSearchParam("updateProductModal");
  const [, setDeleteProductModal] = useSearchParam("deleteProductModal");

  const [isRealizandoRetirada, setIsRealizandoRetirada] = useState(false);

  const { handleSubmit, register, formState, getValues, reset } =
    useForm<z.infer<typeof schema>>();

  const { data: currentUser } = useCurrentUser();

  const { data: productData, refetch } = useReadProducts(
    getValues("name") || ""
  );

  const { mutateAsync: mutateAsyncUpdate } = useUpdateProduct({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readProducts"],
      });
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["readProducts"],
      });
    },
  });

  useEffect(() => {
    refetch().then(({ data }) => {
      reset({
        products: data?.obj || [],
      });
    });
  }, [refetch, reset]);

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

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = Math.min(
  //   startIndex + itemsPerPage,
  //   productData?.obj?.length || 0
  // );

  const totalPages = Math.ceil((productData?.obj?.length || 0) / itemsPerPage);
  const searchProdut = async () => {
    setTimeout(async () => {
      const { data } = await refetch();
      reset({
        products: data?.obj || [],
      });
    }, 0);
  };

  const handleRealizarRetirada = async () => {
    setIsRealizandoRetirada(true);
    const values = getDirtyValues(formState.dirtyFields, getValues());
    type Product = Pick<Schema, "products">["products"][number];
    const products = Object.entries(
      values.products as unknown as Record<string, Partial<Product>>
    );

    await Promise.all(
      products.map(([index, value]) => {
        const initialValueProduct = productData?.obj[Number(index)];
        return mutateAsyncUpdate({
          product: {
            id: initialValueProduct?.id as number,
            stockQtd: Number(value.stockQtd),
            categoryId: initialValueProduct?.category.id,
            description: initialValueProduct?.description,
            name: initialValueProduct?.name,
          },
        });
      })
    );

    reset({
      products: getValues("products"),
    });
    setIsRealizandoRetirada(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent, index: number) => {
    const product = productData?.obj[index].stockQtd || 0;
    const value = ((event.target as unknown as { value: number }).value +
      event.key) as unknown as number;
    if (value > product) {
      event.preventDefault();
    }
  };

  return (
    <div className="m-4">
      <Stack direction="horizontal" gap={3}>
        <div className="p-2">Produtos</div>
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
              disabled={!formState.dirtyFields.products || isRealizandoRetirada}
              onClick={handleRealizarRetirada}
            >
              <FileEarmarkArrowDown />
              <strong>Realizar Retirada</strong>
              {isRealizandoRetirada && (
                <Spinner animation="border" role="status" size="sm">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
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
              <th scope="col">Quantidade</th>
              <th scope="col">Categoria</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {getValues("products")?.map((product, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="number"
                      placeholder="Estoque maximo"
                      min={0}
                      max={productData?.obj?.[index]?.stockQtd}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      disabled={
                        productData?.obj?.[index]?.stockQtd === 0 ||
                        isRealizandoRetirada
                      }
                      {...register(`products.${index}.stockQtd`, {
                        valueAsNumber: true,
                      })}
                    />
                  </Form.Group>
                </td>
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
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
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
