import React, { useState, useEffect } from 'react';
import axios from "axios";

const EditMovie = props => {
    const [edit, setEdit] = useState({ id: 0, title: '', director: '', metascore: 0, stars: [] });

    const fetchMovie = id => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log('res in edit movie', res)
                setEdit({ ...res.data, id: id });
            })
            .catch(err => console.log(err.response));
    };

    useEffect(() => {
        fetchMovie(props.match.params.id);
    }, []);

    const handleChange = e => {
        setEdit({ ...edit, [e.target.name]: e.target.value });
    }

    const handleChangeStars = (e, i) => {
        let starsChange = edit.stars.slice();
        starsChange[i] = e.target.value;
        setEdit({ ...edit, stars: starsChange });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, edit)
            .then(res => {
                console.log(res);
                setEdit({ id: 0, title: '', director: '', metascore: 0, stars: [] });
                props.history.push('/');
            })
            .catch(err => console.log("error", err.response));
    }

    return (
        <form className='movieForm' onSubmit={handleSubmit}>
            <div className='input'>
                <label htmlfor='title'>Title: </label>
                    <input
                        type='text'
                        name='title'
                        id='title'
                        value={edit.title}
                        onChange={handleChange}
                    />
            </div>
            <div className='input'>
                <label htmlfor='director'>Director: </label>
                    <input
                    type='text'
                    name='director'
                    id='director'
                    value={edit.director}
                    onChange={handleChange}
                    />
            </div>
            <div className='input'>
                <label htmlfor='metascore'>Metascore: </label>
                    <input
                    type='number'
                    name='metascore'
                    id='metascore'
                    value={edit.metascore}
                    onChange={handleChange}
                    />
            </div>
            <label >Stars: </label>
                {edit.stars.map((star, i) => {
                    return (
                        <div>
                            <input
                            type='text'
                            name={`stars`}
                            value={star}
                            onChange={(e) => handleChangeStars(e, i)}
                            />
                        </div>
                    )
                })}
            <button>Edit</button>
        </form>
    );
}

export default EditMovie;