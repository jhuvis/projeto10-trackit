import {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import Dia from './Dia';
import axios from 'axios';
import { ThreeDots } from  'react-loader-spinner'
import Habito from './Habito';
import Topo from './Topo';
import UserContext from './UserContext';
import Bottom from './Bottom';

let ndias = [];

export default function Habitos()
{
    const [dados, setDados] = useContext(UserContext);

    let token = localStorage.getItem("token");

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    

    const [nao, setNao] = useState("");
    const [mostra, setMostra] = useState("none");
    const [dias, setDias] = useState(["D", "S", "T", "Q", "Q", "S", "S"]);
    const [nome, setNome] = useState("");
    const [mais, setMais] = useState("+");

    const [carrega, setCarrega] = useState(false);
    const [cadastrar, setCadastrar] = useState("Salvar");
    const [none, setNone] = useState("none");

    const [habitos, setHabitos] = useState([]);


    useEffect(() => {
        let isApiSubscribed = true;
        if(typeof dados.porcentagem === "undefined")
        {
            const porcentagem = localStorage.getItem("porcentagem");  
            setDados({...porcentagem, porcentagem: porcentagem});
        }
        
        const requisicao = axios.get(
          `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, {
            headers: { Authorization: `Bearer ${token}` }
        }
        );
    
        requisicao.then((res) => {
          if(isApiSubscribed) 
          {
            setHabitos(res.data);
            console.log(habitos);
            if(res.data.length === 0)
            {
                setNao("Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!");
            }
            else
            {
                setNao("");
            }
          }
        });
        return () => 
        {
          isApiSubscribed = false;
        };
      }, [!none]);
    
    function novoHabito()
    {
        if(mostra === "none")
        {
            setMostra("criando");
            setMais("-");
        }
        else
        {
            setMostra("none");
            setMais("+");
        }
    }

    function cancelar(e)
    {
        e.preventDefault();
        window.location.reload();
    }

    function semana(index)
    {
        let tem = false;
        let i = 0;
        for(i = 0; i < ndias.length; i++)
        {
          if(ndias[i] === index)
          {
            tem = true;
            break;
          }
        }
        if(tem === false)
        {
          ndias.push(index);
        }
        else
        {
          ndias.splice(i, 1);
        }

        console.log(ndias);
    }

    function salvar(event)
    {
  
      event.preventDefault();
      setCarrega(true);
      setCadastrar("");
      setNone("");

    const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", 
    {
	    name: nome,
        days: ndias,
	},
    config
    );

    requisicao.then(() => 
    {
        setCarrega(false);
        setCadastrar("Salvar");
        setNone("none");
    });

    requisicao.catch(() => {
        setCarrega(false);
        setCadastrar("Salvar");
        setNone("none");
        alert("algo deu errado");

    })
      
  
    }

    return(
        <>
        <Topo />
        <Corpo>
        <Add>
            <p>Meus hábitos</p>
            <button onClick={novoHabito}>{mais}</button>
        </Add>
        <div className={mostra} >
        <div><Input
            type="text"
            id="habito"
            value={nome}
            placeholder="nome do hábito"
            onChange={(e) => setNome(e.target.value)}
            disabled={carrega}
            required
          /></div>
        <Dias>
            {dias.map((d, index) => <Dia 
                                    dia = {d}
                                    index = {index}
                                    semana = {semana}
                                    desativa = {carrega}
                                    cinza = {false}  
                                    key = {index}
                            />)}
        </Dias>
        <Buttons>
            <button onClick={cancelar} className='b1' disabled={carrega}>Cancelar</button>
            <div type="submit" disabled={carrega} onClick={salvar} className='b2'>
                {cadastrar} 
                <div className={none}><ThreeDots color="#FFFFFF" height={40} width={40} /></div> 
            </div>
        </Buttons>
        </div>
        <P>{nao}</P>
        {habitos.map((habito, index) => <Habito
                                        name = {habito.name}
                                        days = {habito.days}
                                        semana = {dias}
                                        id = {habito.id}
                                        config = {config}
                                        key = {index}
        
        
        />)}
        </Corpo>
        <Bottom />
        </>
        
    );
}

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
    

    margin-top: 30px;
`;

const Corpo = styled.div`
background: #E5E5E5;
height: 1000px;
`;

const Dias = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 5px;

`;

const Input = styled.input`
display: flex;
width: 100%;
height: 45px;
background: #FFFFFF;
border: 1px solid #D5D5D5;
border-radius: 5px;

outline: none;

font-family: 'Lexend Deca';
font-style: normal;
font-size: 19.976px;

`;

const P = styled.p`
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 19px;
line-height: 22px;

color: #666666;
margin: 15px;
`;





const Add = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    height: 70px;
    width: 100%;
    margin-top: 80px;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;

    p{
        color: #126BA5;
        margin: 15px;
    }

    button{
        background: #52B6FF;
        border-radius: 4.63636px;
        width: 40px;
        height: 35px;
        border: none;

        color: #FFFFFF;
        margin: 15px;
        font-size: 26px;
    }

`;