// DeleteModal.jsx
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import TrashIcon from "../../../assets/icons/TrashIcon";

export default function DeleteModal({ note, handleDelete }) {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Use onClose instead of onOpenChange

  return (
    <>
      <button
        onClick={onOpen}
        size="sm"
        className="text-red-500 p-0 justify-end bg-transparent hover:opacity-30"
      >
        <TrashIcon />
      </button>
      <Modal placement="top-center" isOpen={isOpen} onClose={onClose}>
        {/* Use onClose instead of onOpenChange */}
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center items-center">
                Are you sure you want to delete?
              </ModalHeader>
              <ModalBody>
                <div className="w-full flex gap-8 justify-center">
                  <Button color="default" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="danger"
                    onPress={() => {
                      handleDelete(note._id);
                      onClose();
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
