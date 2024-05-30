import { CheckIcon, CloseIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons"
import { ButtonGroup, IconButton, Editable, EditableInput, EditablePreview, Flex, Input, useEditableControls, Box, Button, InputGroup, InputRightElement } from "@chakra-ui/react"
import { Message } from "../models";
import { usersMock } from "../mocks";

const EditableControls = (): JSX.Element => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls()

  return isEditing ? (
    <ButtonGroup justifyContent='center' size='sm'>
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} aria-label="" />
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} aria-label="" />
    </ButtonGroup>
  ) : (
    <ButtonGroup justifyContent='center' size='sm'>
      <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} aria-label="" />
      <IconButton size='sm' icon={<DeleteIcon />} aria-label="" />
    </ButtonGroup>
  )
};

export const ChatMessageItem = ({ data }: { data: Message }): JSX.Element => {

  const activeUser = usersMock[1];

  const isAuthorMsg = data.author.id === activeUser.id;

  const message = <Editable
    // textAlign='center'
    isDisabled={!isAuthorMsg}
    defaultValue={data.content}
    // fontSize='2xl'
    isPreviewFocusable={false}
  >
    <InputGroup size='md'>
      <EditablePreview />
      <Input as={EditableInput} />
      <InputRightElement width='4.5rem'>
        {/* <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button> */}
        {isAuthorMsg && <EditableControls />}
      </InputRightElement>
    </InputGroup>

  </Editable>

  return (
    <Box
      bg={isAuthorMsg ? 'blue.400' : 'blue.800'}
      w='400px'
      borderRadius='15px'
      alignSelf={isAuthorMsg ? 'self-end' : 'self-start'}
      p={3}
      m={3}
      color='white'
    >
      {message}
    </Box>
  )
}