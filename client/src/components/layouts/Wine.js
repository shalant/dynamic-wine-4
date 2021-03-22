import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import spinner from '../../spinner.gif'
import {Link} from 'react-router-dom';

const Article = props => {
    const [title, setTitle] = useState('')
    const [article, setArticle] = useState('')
    const [authorname, setAuthorName] = useState('')
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        axios
            .get(`/articles/${props.match.params.id}`)
            .then((response) => [
                setAuthorName(response.data.authorname),
                setTitle(response.data.title),
                setArticle(response.data.article),
                setFileName(response.data.articleImage)
            ])
            .catch(error => console.log(error));
    }, []);

    return (
        <ArticleContainer>
            <>
                <img src={`/uploads/${fileName}`} alt="..." 
                    style={{margin: '0 auto', width: '40%', display: 'flex'}} />
                <h2>{title}</h2>
                <p>{article}</p>
                <p className='badge badge-secondary'>{authorname}</p>
                <br/>
                <Link to='/' type="submit" className="btn btn-primary">
                    Back to Home
                </Link>
            </>
            )}
        </ArticleContainer>
    )
}

export default Article;

//main container
const ArticleContainer = styled.div`
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
