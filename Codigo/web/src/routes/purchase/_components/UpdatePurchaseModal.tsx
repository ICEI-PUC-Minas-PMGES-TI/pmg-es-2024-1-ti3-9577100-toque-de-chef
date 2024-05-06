import { useSearchParam } from "../../../hooks/useSearchParams";
import { Button, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "../../../helpers/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useReadCategories } from "../../../api/Category/useReadCategories";
import { useReadSuplyers } from "../../../api/Suplyer/useReadSuplyers";
import { PlusCircle, Trash } from "react-bootstrap-icons";
import { useReadPurchases } from "../../../api/Purchase/useReadPurchases";
import { useUpdatePurchase } from "../../../api/Purchase/useUpdatePurchase";
import { PurchaseItem, PurchaseItemDto } from "../../../types/purchase";
import { useReadProducts } from "../../../api/Product/useReadProducts";

const schemaEdit = z.object({
  suplyerId: z.number({ required_error: "Obrigatório" }).min(1),
  purchaseItems: z.array(
    z.object({
      product: z.object({
        id: z.number(),
      }),
      unitPrice: z.number({ required_error: "Obrigatório" }).min(1),
      quantity: z.number({ required_error: "Obrigatório" }).min(1),
    })
  ),
});
export const UpdatePurchaseModal = () => {
  const queryClient = useQueryClient();

  const { data: suplyerData } = useReadSuplyers(null);
  const [updatePurchaseModal, setUpdatePurchaseModal] = useSearchParam(
    "updatePurchaseModal"
  );

  const {
    handleSubmit: handleSubmitUpdate,
    register: update,
    formState: formStateUpdate,
    reset,
    getValues,
    setValue,
    watch,
  } = useForm<z.infer<typeof schemaEdit>>({
    resolver: zodResolver(schemaEdit),
  });

  const { data: purchaseData, isLoading } = useReadPurchases(null);
  const selectedPurchaseToUpdate = purchaseData?.obj?.find(
    (product) => product.id === Number(updatePurchaseModal)
  );

  console.log("purchaseData", purchaseData);
  const { mutateAsync: mutateAsyncUpdate } = useUpdatePurchase({
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

  const onSubmitUpdate: SubmitHandler<z.infer<typeof schemaEdit>> = async (
    data
  ) => {
    setUpdatePurchaseModal(undefined);
    await mutateAsyncUpdate({
      purchase: {
        id: selectedPurchaseToUpdate?.id,
        suplyerId: data.suplyerId,
        purchaseItems: data.purchaseItems.map((item) => {
          return {
            productId: item.product.id,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          };
        }),
      },
    });
  };

  const { data: productsData } = useReadProducts(null);
  const { data: categoryData } = useReadCategories(null);

  useEffect(() => {
    if (purchaseData) {
      reset(selectedPurchaseToUpdate);
    }
  }, [isLoading, reset, selectedPurchaseToUpdate, purchaseData]);

  return (
    <Modal
      show={Boolean(updatePurchaseModal)}
      onHide={() => setUpdatePurchaseModal(undefined)}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Cadastrar Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitUpdate(onSubmitUpdate)}>
          <div> Fornecedor</div>

          <Form.Select
            aria-label="Default select example"
            {...update("suplyerId", {
              valueAsNumber: true,
              required: "Obrigatório",
            })}
            isInvalid={Boolean(formStateUpdate.errors.suplyerId)}
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
              <div
                style={{
                  display: "grid",
                  gap: "16px",
                  justifyContent: "center",
                  gridTemplateColumns: "1fr 1fr",
                }}
              >
                {watch("purchaseItems")?.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "16px",
                      boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
                      borderRadius: "8px",
                    }}
                  >
                    <Form.Select
                      aria-label="Default select example"
                      {...update(`purchaseItems.${index}.product.id`, {
                        valueAsNumber: true,
                        required: "Obrigatório",
                      })}
                    >
                      <option value="">Selecione um Produto</option>
                      {productsData?.obj?.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </Form.Select>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "16px",
                        marginTop: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <Form.Group controlId={`price-${index}`}>
                        <Form.Control
                          type="number"
                          placeholder="Preço"
                          {...update(`purchaseItems.${index}.unitPrice`, {
                            valueAsNumber: true,
                            required: "Obrigatório",
                          })}
                          isInvalid={Boolean(
                            formStateUpdate.errors.purchaseItems?.[index]
                              ?.unitPrice
                          )}
                        />
                      </Form.Group>

                      <Form.Group controlId={`quantity-${index}`}>
                        <Form.Control
                          type="number"
                          placeholder="Quantidade"
                          {...update(`purchaseItems.${index}.quantity`, {
                            valueAsNumber: true,
                            required: "Obrigatório",
                          })}
                          isInvalid={Boolean(
                            formStateUpdate.errors.purchaseItems?.[index]
                              ?.quantity
                          )}
                        />
                      </Form.Group>
                    </div>

                    <Button
                      variant="secondary"
                      // onClick={() => removeProductField(index)}
                    >
                      <Trash />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ justifySelf: "end" }}>
              <Button
                className="text-white"
                onClick={() => {
                  setValue("purchaseItems", [
                    ...getValues("purchaseItems"),
                    {
                      product: {
                        id: -1,
                      },
                      quantity: 1,
                      unitPrice: 0,
                    },
                  ]);
                }}
              >
                <PlusCircle />
              </Button>
            </div>
          </div>
          <div className="d-flex gap-2 mt-2">
            <Button
              variant="secondary"
              // onClick={() => setCreatePurchaseModal(undefined)}
            >
              Fechar
            </Button>
            <Button type="submit" className="text-white">
              Editar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
