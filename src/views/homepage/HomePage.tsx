import React, {useState, useEffect} from 'react';
import Bookmarks from '../../components/Bookmark';
import { BookmarksContext } from '../../contextAPI/store';
import { fetchInformations } from '../../services/bookmarks';
import './HomePage.css';

const HomePage = () => {
  const { state, dispatch } = React.useContext(BookmarksContext);

  // faire une routine qui passe toutes les minutes ajouter 1 au temps de upload_date (formatage il y a 1minute, il y a 1heure...)

  const handleClick = () => {
    fetchInformations(state.link)
    .then(res => {
        if (res.hasOwnProperty('error')) {
          dispatch({type: 'apiError', payload: res.error!})
        }
        else {
          // faire une fonction du bloc d'en dessous
          const payload = {...res};
          if ('duration' in payload) {
            const videoTime = new Date(payload.duration as any * 1000).toISOString().slice(11, 19);
            payload.duration = videoTime;
          }
          console.log("new date =>", new Date())
          payload.added_date = new Date();
          // format added_date to => il y a 1minute etc..
          dispatch({type: 'addBookmark', payload})
        }
    })
    .catch(err => {
        dispatch({type: 'apiError', payload: err})
    })
  }

  useEffect(() => {
    console.log("state =>", state)
  }, [state])

  const handleRemoveBookmark = (index: number) => {
    console.log("index =>", index);
    dispatch({type: "removeBookmark", payload: index})
  }

  return (
    <div className="homepage">
      <div className="inputContainer">
        <p>{state.error}</p>
        <input
          value={state.link}
          onChange={e => dispatch({type: 'changeLink', payload: e.target.value})}
          placeholder="enter a link"
        />
        <button
          onClick={handleClick}
          disabled={state.link.length === 0}
        >
          send !
        </button>
      </div>
      <div className="bookmarksContainer">
        <Bookmarks
          items={state.bookmarks}
          removeBookmark={handleRemoveBookmark}
        />
      </div>
    </div>
  );
}

export default HomePage;
