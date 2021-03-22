import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const Wines = ({ posts }) => {
    const [wine, setWine] = useState([])
   
    //DELETE article by id
    const deleteWine = (id) => {
        Axios.delete(`/wines/${id}`)
            .then((response) => alert(response.data));
            setWine(wines.filter((element) => element._id !== id));
    };

    return (
        <MainContainer>
            {posts.map((wine, key) => (
                <div className='container' key={key} >
                    <img src={`/uploads/${wine.articleImage}`} alt='...' style={{width: '40%'}} />
                    <Link 
                        to={{
                        pathname: `/wine/${wine._id}`
                        }}
                    >
                        <h2>{wine.winery}</h2>
                    </Link>
                    
                    <p>{wine.wine}</p>
                    <span className='badge badge-secondary p-2'>
                        {wine.name}
                    </span>
                    <div className='row my-5'>
                        <div className='col-sm-2'>
                            <Link 
                                to={`/update/${wine._id}`} 
                                className='btn btn-outline-success'
                            >
                                Edit Wine
                            </Link>
                        </div>
                        <div className='col-sm-2'>
                            <button onClick={() => deleteWine(wine._id)} className='btn btn-outline-danger'>
                                Delete Wine
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </MainContainer>
    )
}

export default Articles;

//main container

const MainContainer = styled.div`
    margin: 7rem 0;

    img {
        width: 10rem;
        display: block;
        margin: 0 auto;
    }
`;