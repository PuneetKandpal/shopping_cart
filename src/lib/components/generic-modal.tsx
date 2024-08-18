import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";

type AlertBoxProps = {
  isOpen: boolean;
  modalTitle: string;
  onOpenChange: () => void;
  children?: React.ReactNode;
};

function GenericActionBox({
  isOpen,
  onOpenChange,
  modalTitle,
  children,
}: AlertBoxProps) {
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      size="lg"
      onOpenChange={onOpenChange}
      isDismissable={false}
      hideCloseButton={true}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>

        
        <ModalHeader className="flex flex-col gap-1 bg-color-fourth rounded-top-2 text-color-first mb-4 ">
          {modalTitle}
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default GenericActionBox;
