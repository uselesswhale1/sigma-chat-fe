import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

interface ProfileModalProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}
export const ProfileModal = ({
  isOpen,
  onOpen,
  onClose
}: ProfileModalProps): JSX.Element => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            body123
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose} children='Close' />
            <Button variant='ghost' children='Secondary Action' />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}