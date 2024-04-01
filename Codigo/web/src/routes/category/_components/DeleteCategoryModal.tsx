import { useSearchParam } from "../../../hooks/useSearchParams";
import { Button, Modal } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";
import { useReadCategories } from "../../../api/Category/useReadCategories";
import { useDeleteCategory } from "../../../api/Category/useDeleteCategory";

export const DeleteCategoryModal = () => {
  const queryClient = useQueryClient();
  const [deleteCategoryModal, setDeleteCategoryModal] = useSearchParam(
    "deleteCategoryModal"
  );

  const { data: categoryData } = useReadCategories();
  const selectedCategoryToDelete = categoryData?.find(
    (category) => category.id === Number(deleteCategoryModal)
  );
  const { mutateAsync: mutateAsyncDelete } = useDeleteCategory({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readCategories"],
      });
    },
  });
  const handleDeleteCategory = async () => {
    setDeleteCategoryModal(undefined);
    await mutateAsyncDelete(selectedCategoryToDelete!.id);
  };

  const handleCloseDelete = () => {
    setDeleteCategoryModal(undefined);
  };

  return (
    <Modal show={Boolean(deleteCategoryModal)} onHide={handleCloseDelete}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir Categoria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Você tem certeza que deseja excluir a categoria{" "}
        <strong>{selectedCategoryToDelete?.name}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDelete}>
          Cancelar
        </Button>
        <Button className="text-white" onClick={handleDeleteCategory}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
