import React, {useEffect} from 'react';
import Bookmarks from '../../components/Bookmark';
import { BookmarksContext } from '../../contextAPI/store';
import { fetchInformations } from '../../services/bookmarks';
import './HomePage.css';

const HomePage = () => {
  const { state, dispatch } = React.useContext(BookmarksContext);

  useEffect(() => {
    let inter: NodeJS.Timeout | undefined = undefined;
    if (!inter && state.bookmarks.length > 0) {
      inter = setInterval(() => 
        dispatch({type: "updateTimes"})
      , 60000);
    }
    return () => clearInterval(inter);
  }, [state.bookmarks, dispatch])

  const handleClick = () => {
    fetchInformations(state.link)
    .then(res => {
        if (res.hasOwnProperty('error')) {
          dispatch({type: 'apiError', payload: res.error!})
        }
        else {
          const payload = {...res};
          if ('duration' in payload) {
            const videoTime = new Date(payload.duration as any * 1000).toISOString().slice(11, 19);
            payload.duration = videoTime;
          }
          payload.added_date = new Date();
          payload.added_time = new Date();
          dispatch({type: 'addBookmark', payload})
        }
    })
    .catch(err => {
        dispatch({type: 'apiError', payload: err})
    })
  }

  const handleRemoveBookmark = (index: number) => {
    dispatch({type: "removeBookmark", payload: index})
  }

  return (
    <div className="homepage">
      <div className="inputContainer">
        <p>{state.error}</p>
        <input
          value={state.link}
          onChange={e => dispatch({type: 'changeLink', payload: e.target.value})}
          placeholder="Entrer un lien"
        />
        <button
          onClick={handleClick}
          disabled={state.link.length === 0}
        >
          Envoyer
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
