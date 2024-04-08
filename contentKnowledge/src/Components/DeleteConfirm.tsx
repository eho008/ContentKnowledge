import { Button } from "@radix-ui/themes";

export default function DeleteConfirm({
  type,
  deleteUnit,
  handleCloseModal,
}: {
  type: string;
  deleteUnit: () => void;
  handleCloseModal: () => void;
}) {
  return (
    <div className="delete-popup-container">
      <div className="delete-popup">
        <p>Do you really want to delete this {type}?</p>
        <div className="flex justify-end gap-2 mt-2">
          <Button radius="large" color="red" onClick={deleteUnit}>
            Delete
          </Button>
          <Button
            radius="large"
            variant="outline"
            onClick={handleCloseModal}
            color="gray"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
