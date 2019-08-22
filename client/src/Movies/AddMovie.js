import React, {useState, useEffect} from 'react';
import axios from "axios";

const AddMovie = props => {
  const [add,setAdd] = useState({id:0, title:'',director:'',metascore:0,stars:[]});

  const handleChange = e => {
    setAdd({...add, [e.target.name]:e.target.value});
  }

  const newStar = e => {
    e.preventDefault();
    setAdd({...add, stars: [...add.stars,'']
    });
  }

  const handleChangeStars = (e, i) => {
    let starsChange = add.stars.slice();
    starsChange[i] = e.target.value;
    setAdd({ ...add, stars: starsChange });
}

  const handleSubmit = (e) => {
    e.preventDefault();
    setAdd({...add, id: Date.now() });
    axios
    .post(`http://localhost:5000/api/movies/`, add)
    .then(res=>{
      console.log('add',res);
      props.setMovies(res.data);
      setAdd({id:0, title:'',director:'',metascore:0,stars:[]});
      props.history.push('/');

    })
    .catch(err => console.log("error",err.response));
  }

  return(
    <form className='movieForm' onSubmit={handleSubmit}>
      <div className='input'>
        <label htmlFor='title'>Title: </label>
        <input
          type='text'
          name='title'
          id='title'
          value={add.title}
          onChange={handleChange}
        />
      </div>
      <div className='input'>
      <label htmlFor='director'>Director: </label>
        <input
          type='text'
          name='director'
          id='director'
          value={add.director}
          onChange={handleChange}
        />
      </div>
      <div className='input'>
      <label htmlFor='metascore'>Metascore: </label>
        <input
          type='number'
          name='metascore'
          id='metascore'
          value={add.metascore}
          onChange={handleChange}
        />
      </div>
      <label >Stars: </label>
      {add.stars.map((star, i) => {
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
      <button onClick={newStar}>Add Star</button>
      <button>Add</button>
    </form>
  );
}

export default AddMovie;