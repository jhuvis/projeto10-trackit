import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import styled from 'styled-components';
import Login from './Login'
import Signin from "./Signin";
import Habitos from "./Habitos";
import Hoje from "./Hoje";
import UserContext from './UserContext';
import Historico from "./Historico";

export default function App() {

    const [dados, setDados] = useState({});

    
    return (
        <UserContext.Provider value={[dados, setDados]}>
            <Body>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/cadastro" element={<Signin />} />
                    <Route path="/habitos" element={<Habitos />} />
                    <Route path="/hoje" element={<Hoje />} />
                    <Route path="/historico" element={<Historico />} />
                </Routes>
            </BrowserRouter>
            </Body>
        </UserContext.Provider>
    );
  }

  const Body = styled.div`
    display: flex;
    flex-direction: column;
`;
  