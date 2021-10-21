import React from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components'

import Sidebar from './views/Sidebar';
import Login from './views/Login';
import StoreInfo from './views/StoreInfo';
import Dashboard from './views/Dashboard';
import BotEditor from './views/BotEditor';
import Navbar from './views/Navbar';

function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <BrowserRouter>
        <Container>
          <Sidebar />
          <MainSection>
            <Navbar />
            <Switch>
              <Redirect exact from="/" to="/dashboard" />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/storeinfo" component={StoreInfo} />
              <Route exact path="/boteditor" component={BotEditor} />
            </Switch>
          </MainSection>
        </Container>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  min-height: 100vh;
`

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  flex-grow: 1;
  background-color: #f6f8fa;
`
