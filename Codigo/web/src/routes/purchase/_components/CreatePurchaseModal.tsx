import { useState } from "react";
import { Button, Form, Modal, Table, InputGroup } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "../../../helpers/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePurchase } from "../../../api/Purchase/useCreatePurchase";
import { useQueryClient } from "@tanstack/react-query";
import { useReadSuplyers } from "../../../api/Suplyer/useReadSuplyers";
import { useReadProducts } from "../../../api/Product/useReadProducts";
import { useSearchParam } from "../../../hooks/useSearchParams";
import { PurchaseItemDto } from "../../../types/purchase";
import { PlusCircle, Trash } from "react-bootstrap-icons";

const schema = z.object({
  suplyerId: z.number({ required_error: "Obrigatório" }).min(1),
  purchaseItems: z.array(
    z.object({
      productId: z.number({ required_error: "Obrigatório" }).min(1),
      unitPrice: z.number({ required_error: "Obrigatório" }).min(1),
      quantity: z.number({ required_error: "Obrigatório" }).min(1),
    })
  ),
});

export const CreatePurchaseModal = () => {
  const queryClient = useQueryClient();

  const [createPurchaseModal, setCreatePurchaseModal] = useSearchParam(
    "createPurchaseModal"
  );

  const { handleSubmit, register, formState } = useForm<z.infer<typeof schema>>(
    {
      resolver: zodResolver(schema),
    }
  );
  console.log("formState", formState);

  const { mutateAsync } = useCreatePurchase({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readPurchases"],
      });
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["readPurchases"],
      });
    },
  });

  const { data: suplyerData } = useReadSuplyers(null);
  const { data: productsData } = useReadProducts(null);

  const [purchaseItems, setPurchaseItems] = useState<PurchaseItemDto[]>([]);

  const addProductField = () => {
    setPurchaseItems([
      ...purchaseItems,
      {
        productId: null,
        unitPrice: null,
        quantity: null,
      },
    ] as PurchaseItemDto[]);
  };

  const removeProductField = (index: number) => {
    const newPurchaseItems = [...purchaseItems];
    newPurchaseItems.splice(index, 1);
    setPurchaseItems(newPurchaseItems);
  };

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    console.log("data", data);
    setCreatePurchaseModal(undefined);
    await mutateAsync(data);
  };

  return (
    <Modal
      show={Boolean(createPurchaseModal)}
      onHide={() => setCreatePurchaseModal(undefined)}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Cadastrar Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div> Fornecedor</div>

          <Form.Select
            aria-label="Default select example"
            {...register("suplyerId", {
              valueAsNumber: true,
              required: "Obrigatório",
            })}
            isInvalid={Boolean(formState.errors.suplyerId)}
          >
            <option value="">Selecione um Fornecedor</option>
            {suplyerData?.obj.map((suplyer) => (
              <option key={suplyer.id} value={suplyer.id}>
                {suplyer.name}
              </option>
            ))}
          </Form.Select>

          <div
            style={{
              display: "grid",
              gap: "16px",
              paddingTop: "16px",
            }}
          >
            <div> Produtos</div>

            <div
              style={{
                padding: "0 16px",
                overflowY: "scroll",
                maxHeight: "40vh",
              }}
            >
              <div style={{}}>
                <Table responsive>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nome</th>
                      <th scope="col">Quantidade</th>
                      <th scope="col">Valor Unitário</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {purchaseItems.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <Form.Select
                            aria-label="Default select example"
                            {...register(`purchaseItems.${index}.productId`, {
                              valueAsNumber: true,
                              required: "Obrigatório",
                            })}
                            onChange={(e) => {
                              const newPurchaseItems = [...purchaseItems];
                              newPurchaseItems[index].productId = Number(
                                e.target.value
                              );
                              setPurchaseItems(newPurchaseItems);
                            }}
                          >
                            <option value="">Selecione um Produto</option>
                            {productsData?.obj?.map((product) => (
                              <option key={product.id} value={product.id}>
                                {product.name}
                              </option>
                            ))}
                          </Form.Select>
                        </td>

                        <td>
                          <Form.Group controlId={`quantity-${index}`}>
                            <Form.Control
                              type="number"
                              placeholder="Quantidade"
                              {...register(`purchaseItems.${index}.quantity`, {
                                valueAsNumber: true,
                                required: "Obrigatório",
                              })}
                              isInvalid={Boolean(
                                formState.errors.purchaseItems?.[index]
                                  ?.quantity
                              )}
                            />
                          </Form.Group>
                        </td>
                        <td>
                          <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                              type="number"
                              placeholder="Preço"
                              {...register(`purchaseItems.${index}.unitPrice`, {
                                valueAsNumber: true,
                                required: "Obrigatório",
                              })}
                              isInvalid={Boolean(
                                formState.errors.purchaseItems?.[index]
                                  ?.unitPrice
                              )}
                            />
                            <InputGroup.Text>.00</InputGroup.Text>
                          </InputGroup>
                        </td>
                        <td>
                          <Button
                            variant="secondary"
                            onClick={() => removeProductField(index)}
                          >
                            <Trash />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>

            <div style={{ justifySelf: "end" }}>
              <Button onClick={addProductField} className="text-white">
                <PlusCircle />
              </Button>
            </div>
          </div>
          <div className="d-flex gap-2 mt-2">
            <Button
              variant="secondary"
              onClick={() => setCreatePurchaseModal(undefined)}
            >
              Fechar
            </Button>
            <Button type="submit" className="text-white">
              Criar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
