import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Bottom()
{
    

    return(
        
        <Bot>
            <Link to={"/habitos"}><p>Hábitos</p></Link>
            <Bola><Link to={"/hoje"}><p>Hoje</p></Link></Bola>
            <Link to={"/"}><p>Histórico</p></Link>
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