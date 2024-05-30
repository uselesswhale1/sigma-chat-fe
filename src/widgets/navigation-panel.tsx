import { TableContainer, Table, Tr, Tbody, Td, Avatar, AvatarBadge, Box, SimpleGrid, Heading } from "@chakra-ui/react"
import { Message } from "../shared/models"
import { msgMock } from "../shared/mocks";


export const NavigationPanel = (): JSX.Element => {

  const handleMsgClick = (id: number): void => {
    console.log(id);

  }

  const chats = [
    ...msgMock
  ].map((msg: Message) => (
    <Tr>
      <Td>
        <SimpleGrid columns={2} spacingX='5px' templateColumns='60px 1fr 40px' onClick={() => handleMsgClick(msg.id)}>
          <Avatar size='md' name={msg.author.name} src={msg.author.photoUrl}>
            <AvatarBadge
              boxSize='0.9em'
              border='1px solid white'
              bg={msg.author.online ? 'green.400' : 'gray.400'}
            />
          </Avatar>
          <SimpleGrid columns={1} spacingY='10px'>
            <Box height='15px'>{msg.author.name}</Box>
            <Box
              height='15px'
              whiteSpace='nowrap'
              overflow='hidden'
              textOverflow='ellipsis'
            >{msg.content}</Box>
          </SimpleGrid>
          {/* <Tag h='10px' w='60px' alignSelf='center' color='gray.800' borderRadius='full'>5</Tag> */}
        </SimpleGrid>
      </Td>
    </Tr>
  ));


  return (
    <>
      <TableContainer >
        <Table size='sm'>
          <Tbody>
            {
              chats.length
                ? chats
                : (
                  <Tr h='500px'>
                    <Td>
                      chats will appear here
                    </Td>
                  </Tr>
                )
            }
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}



// <Tr>
// <Td>
//   <SimpleGrid columns={2} spacingX='5px' templateColumns='50px 1fr'>
//     <Avatar size='sm' name='Markus Karlsen' src=''>
//       <AvatarBadge boxSize='0.9em' bg='green.400' />
//     </Avatar>
//     <SimpleGrid columns={1} spacingY='10px'>
//       <Box height='15px'>Markus Karlsen</Box>
//       <Box height='15px'>531231231231231231234</Box>
//     </SimpleGrid>
//   </SimpleGrid>
// </Td>
// </Tr>
