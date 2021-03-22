import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const EditWine = (props) => {
    const [winery, setWinery] = useState('');
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [message, setMessage] = useState('');
    const [fileName, setFileName] = useState('');


    const onChangeFile = (e) => {
        setFileName(e.target.files[0]);
    };

    const changeOnClick = (e) => {
        e.preventDefault();

    const formData = new FormData();

    formData.append('winery', winery);
    formData.append('name', name);
    formData.append('year', year);
    formData.append('articleImage', fileName);
    
    axios
        .put(`/wines/update/${props.match.params.id}`, formData)
        .then((res) => setMessage(res.data))
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        axios
            .get(`/wines/${props.match.params.id}`)
            .then((res)=> [
                setWinery(res.data.winery),
                setName(res.data.name),
                setYear(res.data.year),
                setFileName(res.data.articleImage)
            ])
            .catch((err) => {
                console.log(err);
            });
    }, [`${props.match.params.id}`]);

    return (
        <EditWineContainer>
            <div className='container'>
                <h1>Edit Wine</h1>
                <span className='message'>{message}</span>
            <form onSubmit={changeOnClick} encType='multipart/form-data'>
                <div className="form-group">
                    <label htmlFor="winery">Winery</label>
                    <input 
                        type="text" 
                        value={winery}
                        onChange={e => setWinery(e.target.value)}
                        className="form-control" 
                        placeholder="Winery" 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">NAme</label>
                    <input 
                        type="text"
                        value={name} 
                        onChange={e => setName(e.target.value)}
                        className="form-control" 
                        placeholder="Name" 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <textarea
                        value={year}
                        onChange={e => setYear(e.target.value)}
                        className="form-control" 
                        rows="3"
                    ></textarea>
                </div>
                <div className='form-group'>
                    <label htmlFor='file'>Choose article image</label>
                    <input 
                        type='file' 
                        fileName='articeImage' 
                        className='form-control-file'
                        onChange={onChangeFile}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Update Wine
                </button>
            </form>
            </div>
        </EditWineContainer>
    )
}

export default EditWine;

//main container

const EditWineContainer = styled.div`
    margin: 3rem auto;
    padding: 4rem;
    width: 31.25rem;

    h1 {
        font-weight: 900;
        color: var(--dark-green)
    }

    .btn-primary {
        margin-top: 2rem;
        background: var(--dark-green);
        border: none;
        &:hover {
            background: var(--light-green)
        }
    }

    .message {
        font-weight: 900;
        color: tomato;
        padding: 1rem 1rem 1rem 0;
    }
`;