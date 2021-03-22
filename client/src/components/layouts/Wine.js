import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import spinner from '../../spinner.gif'
import {Link} from 'react-router-dom';

const Wine = props => {
    const [winery, setWinery] = useState('')
    const [name, setName] = useState('')
    const [year, setYear] = useState('')
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        axios
            .get(`/wines/${props.match.params.id}`)
            .then((response) => [
                setWinery(response.data.winery),
                setName(response.data.name),
                setYear(response.data.year),
                setFileName(response.data.articleImage)
            ])
            .catch(error => console.log(error));
    }, []);

    return (
        <WineContainer>
            <>
                <img src={`/uploads/${fileName}`} alt="..." 
                    style={{margin: '0 auto', width: '40%', display: 'flex'}} />
                <h2>{winery}</h2>
                <p>{name}</p>
                <p className='badge badge-secondary'>{year}</p>
                <br/>
                <Link to='/' type="submit" className="btn btn-primary">
                    Back to Home
                </Link>
            </>
            )}
        </WineContainer>
    )
}

export default Wine;

//main container
const WineContainer = styled.div`
    margin: 6rem auto;
    padding: 3rem 14rem;

    h2 {
        text-align: center;
        font-weight: 900;
        color: var(--dark-green)
    }

    img {
        width: 1.5rem;
        display: block;
        margin: auto;
    }

    .btn-primary {
        background: var(--dark-green);
        border: none;
        &:hover {
            background: var(--light-green)
        }
    }
`;
