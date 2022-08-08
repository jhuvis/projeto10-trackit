import { useState, useEffect } from "react";
import styled from 'styled-components';
import img from './visto.png';
import axios from 'axios';

let verde = "#8FC549";
let verde2 = "#8FC549";
let verde3 = "#8FC549";
let preto = "#EBEBEB";
let d1 = "dias";
let d2 = "dias";

export default function Check(props)
{
    const {id, name, done, currentSequence, highestSequence, token, judas} = {...props};
    const [dados, setDados] = useState({id, name, done, currentSequence, highestSequence, token});

    const [current, setCurrent] = useState(currentSequence);
    const [high, setHigh] = useState(highestSequence);

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    if(done === true)
    {
        verde = "#8FC549";
        verde3 = "#8FC549";
        if(dados.currentSequence === dados.highestSequence)
        {
            verde2 = "#8FC549";
        }
        else
        {
            verde2 = "#666666";
        }
    }
    else
    {
        verde = preto;
        verde3 = "#666666";
        verde2 = "#666666";
    }

    if(dados.currentSequence === 0)
    {
        d1 = "dia";
    }
    else
    {
        d1 = "dias"
    }

    if(dados.highestSequence === 0)
    {
        d2 = "dia";
    }
    else
    {
        d2 = "dias"
    }


    const [cor, setCor] = useState(verde);
    const [cor2, setCor2] = useState(verde2);
    const [cor3, setCor3] = useState(verde3);

    const [dias, setdias] = useState(d1);
    const [dias2, setdias2] = useState(d2);

    useEffect(() => {
        setDados({...props}); 
        console.log("salve");
    }, [cor]);

    
    function toma(event)
    {
        event.preventDefault();
        if(cor === "#EBEBEB")
        {
            const requisicao = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, {}, config);

            requisicao.then(() => 
            {
                judas();
                setCurrent(current+1);
                setCor("#8FC549");
                setCor3("#8FC549");
                if(dados.currentSequence === dados.highestSequence)
                {
                    setHigh(high+1);
                    setCor2("#8FC549");
                }
                setdias("dias");
                setdias2("dias");
            });

            requisicao.catch(() => 
            {
                alert("algo deu errado");
            });
        }
        else
        {
            const requisicao = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {}, config);

            requisicao.then(() => 
            {
                judas();
                if(dados.currentSequence === 0)
                {
                    setdias("dia");
                }
                if(dados.highestSequence === 0)
                {
                    setdias2("dia");
                }
                
                setCurrent(current-1);
                if(dados.currentSequence === dados.highestSequence)
                {
                    setHigh(high-1);
                }

                setCor("#EBEBEB");
                setCor3("#666666");
                setCor2("#666666");
                
            });

            requisicao.catch(() => 
            {
                alert("algo deu errado");
            });
        }    
  
    }

    return(
        
        <Caixa>
            <Texto>
                <h2>{name}</h2>
                <div>Sequência atual: <P core={cor3}>{current} {dias}</P></div>
                <div>Seu recorde: <P core={cor2}>{high} {dias2}</P></div>
            </Texto>
            <Lado>
                <Botao type="submit" back={cor} onClick={toma}>
                    <img src={img}></img>
                </Botao>
            </Lado>
        </Caixa>
    );
}
const P = styled.p`
color: ${props => props.core};
`;

const Lado = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
`;

const Texto = styled.div`
display: flex;
align-items: flex-start;
justify-content: flex-start;
flex-direction: column;

font-family: 'Lexend Deca';
font-style: normal;
font-weight: 500;
font-size: 14px;

color: #666666;

div{
    display: flex;
    flex-direction: row;
}

h2{
margin-bottom: 15px;
font-size: 22px;
}

`;

const Caixa = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
justify-content: space-between;
padding: 15px;

width: auto;
height: 94px;
margin: 15px;

background: #FFFFFF;
border-radius: 5px;

font-family: 'Lexend Deca';
font-style: normal;
font-size: 19.976px;
`;

const Botao = styled.button`

    display: flex;
    align-items: center;
    justify-content: center;

  background: ${props => props.back};

  border: none;
  border-radius: 5px;

  width: 69px;
height: 69px;


`;