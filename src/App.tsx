import './App.css';
import {
  ChatContainer,
  NavigationPanel,
  Header
} from './widgets';
import { ChakraProvider, Grid, GridItem } from '@chakra-ui/react';

const App = (): JSX.Element => {
  return (
    <ChakraProvider>
      <Grid
        templateAreas={`
          "header header"
          "nav main"
        `}
        gridTemplateRows={'60px 1fr'}
        gridTemplateColumns={'360px 1fr'}
        alignItems='stretch'
        // h='200px'
        // gap='1'
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem p={2} bg='orange.300' area={'header'}>
          <Header />
        </GridItem>
        <GridItem px={1} bg='blue.300' area={'nav'}>
          <NavigationPanel />
        </GridItem>
        <GridItem px={1} bg='green.300' area={'main'}>
          <ChatContainer />
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
