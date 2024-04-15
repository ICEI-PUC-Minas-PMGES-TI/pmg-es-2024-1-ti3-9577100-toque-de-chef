import { useSearchParam } from "../../../hooks/useSearchParams";
import { Button, Modal } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";
import { useReadProducts } from "../../../api/Product/useReadProducts";
import { useDeleteProduct } from "../../../api/Product/useDeleteProducts";

export const DeleteProductModal = () => {
  const queryClient = useQueryClient();
  const [deleteProductModal, setDeleteProductModal] =
    useSearchParam("deleteProductModal");

  const { data: productData } = useReadProducts(null);
  const selectedProductToDelete = productData?.obj?.find(
    (product) => product.id === Number(deleteProductModal)
  );

  const { mutateAsync: mutateAsyncDelete } = useDeleteProduct({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readProducts"],
      });
    },
  });

  const handleDeleteProduct = async () => {
    setDeleteProductModal(undefined);
    await mutateAsyncDelete(selectedProductToDelete!.id);
  };

  const handleCloseDelete = () => {
    setDeleteProductModal(undefined);
  };

  return (
    <Modal show={Boolean(deleteProductModal)} onHide={handleCloseDelete}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Você tem certeza que deseja excluir o produto{" "}
        <strong>{selectedProductToDelete?.name}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDelete}>
          Cancelar
        </Button>
        <Button className="text-white" onClick={handleDeleteProduct}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
