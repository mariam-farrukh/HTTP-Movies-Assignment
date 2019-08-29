import React, { useState, useEffect } from 'react';
import axios from "axios";

const EditMovie = props => {
    const [edit, setEdit] = useState({ id: 0, title: '', director: '', metascore: 0, stars: [] });

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(res => {
            console.log('res in edit movie', res)
            setEdit({ ...res.data, id: props.match.params.id });
        })
        .catch(err => console.log(err.response));

    }, [])

    const handleChange = e => {
        setEdit({ ...edit, [e.target.name]: e.target.value });
    }

    const addStar = e => {
        e.preventDefault();
        setEdit({...edit, stars: [...edit.stars,'']
        });
      }

    const handleChangeStars = (e, i) => {
        // First way of doing this
        // let starsChange = edit.stars.slice();
        // starsChange[i] = e.target.value;
        // setEdit({ ...edit, stars: starsChange });
        // The above is one way of doing this, but it doesn't make the onChange clean
        // Second (and cleaner) way of setting this up
        setEdit({...edit, stars: edit.stars.map((star, starIndex) => {
            return starIndex === index ? e.target.value: star;
        })});
    };

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
                <label htmlFor='title'>Title: </label>
                    <input
                        type='text'
                        name='title'
                        id='title'
                        value={edit.title}
                        onChange={handleChange}
                    />
            </div>
            <div className='input'>
                <label htmlFor='director'>Director: </label>
                    <input
                    type='text'
                    name='director'
                    id='director'
                    value={edit.director}
                    onChange={handleChange}
                    />
            </div>
            <div className='input'>
                <label htmlFor='metascore'>Metascore: </label>
                    <input
                    type='number'
                    name='metascore'
                    id='metascore'
                    value={edit.metascore}
                    onChange={handleChange}
                    />
            </div>
            <div className='input'>
            <label htmlFor='stars'>Stars: </label>
                {edit.stars.map((star, i) => {
                    return (
                        <div>
                            <input
                            type='text'
                            name={`stars`}
                            value={star}
                            // onChange={(e) => handleChangeStars(e, i)} note that this is the first way with the onChange
                            onChange={handleChangeStars(index)}
                            //this is the second 
                            />
                        </div>
                    )
                })}
            </div>
            <button onClick={addStar}>Add Star</button>
            <button>Update</button>
        </form>
    );
}

export default EditMovie;