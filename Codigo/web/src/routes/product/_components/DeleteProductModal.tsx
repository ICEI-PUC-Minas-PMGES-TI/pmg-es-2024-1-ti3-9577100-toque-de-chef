import { useSearchParam } from "../../../hooks/useSearchParams";
import { Button, Modal } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";
import { useReadSuplyers } from "../../../api/Suplyer/useReadSuplyers";
import { useDeleteSuplyer } from "../../../api/Suplyer/useDeleteSuplyer";

export const DeleteProductModal = () => {
  const queryClient = useQueryClient();
  const [deleteProductModal, setDeleteProductModal] =
    useSearchParam("deleteProductModal");

  const { data: suplyerData } = useReadSuplyers();
  const selectedSuplyerToDelete = suplyerData?.find(
    (suplyer) => suplyer.id === Number(deleteProductModal)
  );
  const { mutateAsync: mutateAsyncDelete } = useDeleteSuplyer({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readSuplyers"],
      });
    },
  });
  const handleDeleteProduct = async () => {
    setDeleteProductModal(undefined);
    await mutateAsyncDelete(selectedSuplyerToDelete!.id);
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
        <strong>{selectedSuplyerToDelete?.name}</strong>?
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
