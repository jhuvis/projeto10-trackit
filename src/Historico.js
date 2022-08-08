import styled from 'styled-components';
import Topo from './Topo';
import Bottom from './Bottom';

export default function Historico()
{   

    return(
        <>
        <Topo />
        <Caixa>
            <h2>Histórico</h2>
            <h4>Em breve você poderá ver o histórico dos seus hábitos aqui!</h4>
        </Caixa>
        <Bottom />
        </>
    );
}

const Caixa = styled.div`
    background: #E5E5E5;
    width: 100%;
    min-height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    -webkit-box-pack: start;
    margin-bottom: 70px;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 500;
    h2{    
        font-size: 24px;
        color: #126BA5;
        margin-top: 95px;
        margin-left: 15px;
        margin-bottom: 10px;
    }
    h4{
        font-size: 19px;
        color: #666666;
        margin: 15px;
    }
`;

