import Topo from "./Topo";
import Bottom from "./Bottom";
import UserContext from './UserContext';
import dayjs from 'dayjs';
import styled from 'styled-components';
import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Check from "./Check";

export default function Hoje()
{
    const [dados, setDados] = useContext(UserContext);

    let token = localStorage.getItem("token");
    let image = localStorage.getItem("image");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };


    const semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];

    const[data, setData] = useState(semana[dayjs().day()] + ", " + dayjs().date() + "/" + (dayjs().month()+1));
    const[concluido, setConcluido] = useState("Nenhum hábito concluído ainda");

    const [habitos, setHabitos] = useState([]);
    const [att, setAtt] = useState(0);

    function judas()
    {
      setAtt(att + 1);
    }

    useEffect(() => {
        let isApiSubscribed = true;
        setDados({...image, image: image});

        
        const requisicao = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`, config);
    
        requisicao.then((res) => {
          if(isApiSubscribed) 
          {
            console.log("tome");
            setHabitos(res.data);
            console.log(res.data);
            if(res.data.length === 0)
            {
                setConcluido("Nenhum hábito concluído ainda");
            }
            else
            {
                setConcluido("67% dos hábitos concluídos");
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
            <p>{concluido}</p>
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
height: 1000px;
`;

const Top = styled.div`
display: flex;
flex-direction: column;

margin-top: 95px;
margin-left: 15px;

font-family: 'Lexend Deca';
font-style: normal;
font-weight: 500;
font-size: 25px;
color: #126BA5;
    
    p{
        color: #BABABA;
        font-size: 19px;
        margin-top: 5px;
    }
`;