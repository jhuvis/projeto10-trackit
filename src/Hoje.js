import Topo from "./Topo";
import Bottom from "./Bottom";
import UserContext from './UserContext';
import dayjs from 'dayjs';
import styled from 'styled-components';
import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Check from "./Check";

let relogio = "0";

export default function Hoje()
{
    const [dados, setDados] = useContext(UserContext);

    let token = localStorage.getItem("token");

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];

    if(dayjs().date() < 10)
    {
      if(dayjs().month()+1 < 10)
      {
        relogio = (semana[dayjs().day()] + ", 0" + dayjs().date() + "/0" + (dayjs().month()+1));
      }
      else
      {
        relogio = (semana[dayjs().day()] + ", 0" + dayjs().date() + "/" + (dayjs().month()+1));
      }
    }
    else
    {
      if(dayjs().month()+1 < 10)
      {
        relogio = (semana[dayjs().day()] + ", " + dayjs().date() + "/0" + (dayjs().month()+1));
      }
      else
      {
        relogio = (semana[dayjs().day()] + ", " + dayjs().date() + "/" + (dayjs().month()+1));
      }
    }

    const[data, setData] = useState(relogio);
    const[concluido, setConcluido] = useState("Nenhum hábito concluído ainda");
    const[cor, setCor] = useState("#BABABA");

    const [habitos, setHabitos] = useState([]);
    const [att, setAtt] = useState(0);

    function judas()
    {
      setAtt(att + 1);
    }

    useEffect(() => {
        let isApiSubscribed = true;
        
        const requisicao = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`, config);
    
        requisicao.then((res) => {
          if(isApiSubscribed) 
          {
            setHabitos(res.data);

            let n = 0;
            for (let i= 0; i < res.data.length; i++) 
            {
              if(res.data[i].done === true)
              {
                n++;
              }          
            }

            const porcentagem = Math.ceil((n/res.data.length)*100);

            setConcluido(porcentagem + "% dos hábitos concluídos");
            localStorage.setItem("porcentagem", porcentagem);
            setDados({...porcentagem, porcentagem: porcentagem});
            setCor("#8FC549");
            
            if((typeof porcentagem === "undefined")||(porcentagem === 0))
            {
                setConcluido("Nenhum hábito concluído ainda");
                setCor("#BABABA");

                const porcentagem = 0;
                localStorage.setItem("porcentagem", porcentagem);
                setDados({...porcentagem, porcentagem: porcentagem});
            }
            
          }
        });
        return () => 
        {
          isApiSubscribed = false;
        };
      }, [att]);


    return(
        <>
        <Topo />
        <Corpo>
        <Top>
            {data}
            <P core={cor}>{concluido}</P>
        </Top>
        {habitos.map((habito, index) => <Check
                                        id = {habito.id}
                                        name = {habito.name}
                                        done = {habito.done}
                                        currentSequence = {habito.currentSequence}
                                        highestSequence = {habito.highestSequence}
                                        token = {token}
                                        judas = {judas}
                                        key = {index}       
        />)}
        </Corpo>
        <Bottom />
        </>
    );
}

const Corpo = styled.div`
background: #E5E5E5;
width: 100%;
min-height: calc(100vh - 70px);
display: flex;
flex-direction: column;
-webkit-box-pack: start;
margin-bottom: 70px;
`;

const Top = styled.div`
display: flex;
flex-direction: column;

margin-top: 95px;
margin-left: 15px;
margin-right: 15px;
margin-bottom: 30px;

font-family: 'Lexend Deca';
font-style: normal;
font-weight: 500;
font-size: 25px;
color: #126BA5;
    
`;

const P = styled.p`
color: ${props => props.core};
font-size: 19px;
margin-top: 5px;
`