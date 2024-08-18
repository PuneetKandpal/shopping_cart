

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

type AlertBoxProps = {
  isOpen: boolean;
  content: React.ReactNode;
  actionName: string;
  modalTitle: string;
  onAction: () => void;
  onOpenChange: () => void;
  isPending?: boolean;
};

function AlertBox({
  isOpen,
  modalTitle,
  actionName,
  onOpenChange,
  content,
  onAction,
  isPending= false
}: AlertBoxProps) {
  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
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
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-primary rounded-top-2 text-white mb-4">
                {modalTitle}
              </ModalHeader>
              <ModalBody>
                <>{content}</>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button className="bg-primary text-white" onPress={onAction} isDisabled={isPending} isLoading={isPending}>
                  {actionName}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AlertBox;
