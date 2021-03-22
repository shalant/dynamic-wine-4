import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const AddWine = () => {
    const [winery, setWinery] = useState('');
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [message, setMessage] = useState('');
    const [filename, setFileName] = useState('');

    const onChangeFile = e => {
        setFileName(e.target.files[0]);
    };

    const changeOnClick = e => {
        e.preventDefault();

    const formData = new FormData();

    formData.append('winery', winery);
    formData.append('name', name);
    formData.append('year', year);
    formData.append('articleImage', filename);


        setWinery('');
        setName('');
        setYear('');

        axios
            .post('/wines/add', formData)
            .then(res => setMessage(res.data))
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <AddWineContainer>
        <div className='container'>
            <h1>Add New Wine</h1>
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
                <label htmlFor="name">Name</label>
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
                <label htmlFor='file'>Choose wine image</label>
                <input 
                    type='file' 
                    fileName='articeImage' 
                    className='form-control-file'
                    onChange={onChangeFile}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Post Wine
            </button>
        </form>
        </div>
        </AddWineContainer>
    )
}

export default AddWine;

//main container

const AddWineContainer = styled.div`
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