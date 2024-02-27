// SubmitModal.jsx
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
  Checkbox,
} from "@nextui-org/react";
import { useState } from "react";

export default function SubmitModal({ handleNewNote }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formState, setformState] = useState({
    title: "",
    content: "",
    important: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setformState({ ...formState, [name]: newValue });
  };

  const handleSubmit = () => {
    // Here you can send the formState object to your backend or perform any other actions
    handleNewNote(formState);
    onClose(); // Close the modal after submission
    // Reset the form data to its initial values
    setformState({
      title: "",
      content: "",
      important: false,
    });
  };

  return (
    <>
      <Button color="success" onClick={onOpen}>
        Add Note
      </Button>
      <Modal
        className="mx-3"
        placement="top-center"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader>Add Note</ModalHeader>
          <ModalBody>
            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Input
                  isRequired
                  label="Title"
                  variant="bordered"
                  name="title"
                  value={formState.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Textarea
                  isRequired
                  label="Notes"
                  variant="bordered"
                  name="content"
                  value={formState.content}
                  onChange={handleInputChange}
                />
              </div>
              <Checkbox
                color="primary"
                name="important"
                checked={formState.important}
                onChange={handleInputChange}
              >
                Important
              </Checkbox>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={onClose}>
              Close
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
