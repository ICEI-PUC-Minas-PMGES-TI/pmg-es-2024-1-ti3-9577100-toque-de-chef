import { useSearchParam } from "../../../hooks/useSearchParams";
import { Button, Modal } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";
import { useReadSuplyers } from "../../../api/Suplyer/useReadSuplyers";
import { useDeleteSuplyer } from "../../../api/Suplyer/useDeleteSuplyer";

export const DeleteSuplyerModal = () => {
  const queryClient = useQueryClient();
  const [deleteSuplyerModal, setDeleteSuplyerModal] =
    useSearchParam("deleteSuplyerModal");

  const { data: suplyerData } = useReadSuplyers();
  const selectedSuplyerToDelete = suplyerData?.find(
    (suplyer) => suplyer.id === Number(deleteSuplyerModal)
  );
  const { mutateAsync: mutateAsyncDelete } = useDeleteSuplyer({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readSuplyers"],
      });
    },
  });
  const handleDeleteSuplyer = async () => {
    setDeleteSuplyerModal(undefined);
    await mutateAsyncDelete(selectedSuplyerToDelete!.id);
  };

  const handleCloseDelete = () => {
    setDeleteSuplyerModal(undefined);
  };

  return (
    <Modal show={Boolean(deleteSuplyerModal)} onHide={handleCloseDelete}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir Fornecedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Você tem certeza que deseja excluir o fornecedor{" "}
        <strong>{selectedSuplyerToDelete?.name}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDelete}>
          Cancelar
        </Button>
        <Button className="text-white" onClick={handleDeleteSuplyer}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
