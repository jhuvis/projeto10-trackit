import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";
import { useContext, useState } from 'react';
import UserContext from './UserContext';

let n = 0;

export default function Bottom()
{
    const [dados, setDados] = useContext(UserContext);
    

    return(
        
        <Bot>
            <Link to={"/habitos"}><p>Hábitos</p></Link>
            <Bola><Link to={"/hoje"}><CircularProgressbar
                                        value={dados.porcentagem}
                                        text={`Hoje`}
                                        background
                                        backgroundPadding={6}
                                        styles={buildStyles({
                                            backgroundColor: "#52B6FF",
                                            textColor: "#fff",
                                            pathColor: "#fff",
                                            trailColor: "transparent"
                                        })}><p>Hoje</p></CircularProgressbar></Link></Bola>
            <Link to={"/Historico"}><p>Histórico</p></Link>
        </Bot>
    );
}

const Bot = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 70px;
    z-index: 1;

    height: 70px;
    width: 100%;

    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    
    p{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    text-align: center;
    
    color: #52B6FF;
    }
    
`;

const Bola = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    bottom: 20px;
    

    width: 91px;
    height: 91px;
    border-radius: 98.5px;
    background: #52B6FF;
    p{
        color: #FFFFFF;
        
    }
    
`;