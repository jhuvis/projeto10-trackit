import logo from './TrackIt.png'
import styled from 'styled-components';
import { useContext } from 'react';
import UserContext from './UserContext';

export default function Topo()
{
    const [dados, setDados] = useContext(UserContext);

    return(
        <Top>
            <img src={logo}></img>
            <Perfil src={dados.image}></Perfil>
        </Top>
    );
}

const Top = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    z-index: 1;

    height: 70px;
    width: 100%;

    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    img{
        margin: 15px;
    }
`;

const Perfil = styled.img`
    width: 51px;
    height: 51px;
    border-radius: 98.5px;
`;
