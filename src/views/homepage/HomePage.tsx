import React, {useState, useEffect} from 'react';
import { CountContext } from '../../contextAPI/store';
import { fetchInformations } from '../../services/bookmarks';
import './HomePage.css';

const HomePage = () => {
  const { state, dispatch } = React.useContext(CountContext);

  const handleClick = () => {
    let newState;
    fetchInformations(state.link)
    .then(res => {
        if (res.hasOwnProperty('error')) {
          console.log("ici")
            dispatch({type: 'apiError', payload: res.error!})
        }
        else {
           
            dispatch({type: 'addBookmark', payload: res})
            // newState.bookmarks = tmp;
        }
    })
    .catch(err => {
        console.log("err =>", err)
        dispatch({type: 'apiError', payload: err})
    })
  console.log("newstate =>", newState)

  }

  useEffect(() => {
    console.log("state =>", state)
  }, [state])

  return (
    <div className="Homepage">
      <div>
        <p>{state.error}</p>
        <input
          defaultValue={state.link}
          onChange={e => dispatch({type: 'changeLink', payload: e.target.value})}
          placeholder="enter a link"
        />
        <button
          onClick={handleClick}
          // disabled={state.link.length === 0}
        >
          send !
        </button>
      </div>
    </div>
  );
}

export default HomePage;
