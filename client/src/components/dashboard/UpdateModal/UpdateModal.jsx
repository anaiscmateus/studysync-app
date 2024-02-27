// UpdateModal.jsx
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import PenIcon from "../../../assets/icons/PenIcon";
import { useState, useEffect } from "react";

export default function UpdateModal({ note, handleUpdate }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formState, setFormState] = useState({
    title: note.title || "", // If note.title is falsy, set it to an empty string
    content: note.content || "", // If note.content is falsy, set it to an empty string
  });

  // Inside your UpdateModal component
  useEffect(() => {
    setFormState({
      title: note.title || "",
      content: note.content || "",
    });
  }, [note]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdate(note._id, formState); // Pass the note ID and the updated data
    onClose(); // Close the modal after submission
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <button
        onClick={onOpen}
        size="sm"
        className="text-blue-500 p-0 justify-end bg-transparent hover:opacity-30"
      >
        <PenIcon />
      </button>
      <Modal placement="top-center" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <>
            <ModalHeader>Update Note</ModalHeader>
            <ModalBody>
              <Input
                isRequired
                label="Title"
                variant="bordered"
                name="title"
                value={formState.title}
                onChange={handleInputChange}
              />
              <Textarea
                isRequired
                label="Notes"
                variant="bordered"
                name="content"
                value={formState.content}
                onChange={handleInputChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={onClose}>
                Cancel
              </Button>
              <Button color="primary" onClick={handleSubmit}>
                Update
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
