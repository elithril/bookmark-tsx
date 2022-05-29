import React, { useEffect } from 'react';
import Bookmarks from '../../components/Bookmark';
import { BookmarksContext } from '../../contextAPI/bookmark-context';
import { fetchInformations } from '../../services/bookmarks';
import './HomePage.css';

const HomePage = () => {
  const { state, dispatch } = React.useContext(BookmarksContext);

  useEffect(() => {
    let inter: NodeJS.Timeout | undefined = undefined;
    if (!inter && state.bookmarks.length > 0) {
      inter = setInterval(() =>
        dispatch({ type: "updateTimes" })
        , 60000);
    }
    return () => clearInterval(inter);
  }, [state.bookmarks, dispatch])

  const handleFetchNoEmbed = () => {
    fetchInformations(state.link)
      .then(res => {
        if (res.hasOwnProperty('error')) {
          dispatch({ type: 'apiError', payload: res.error! })
        }
        else {
          const payload = { ...res };
          if ('duration' in payload) {
            const videoTime = new Date(payload.duration as any * 1000).toISOString().slice(11, 19);
            payload.duration = videoTime;
            payload.upload_date =
              new Date(payload.upload_date)
                .toLocaleDateString(
                  "fr-FR",
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }
                );
          }
          payload.added_date = new Date();
          payload.added_time = new Date();
          dispatch({ type: 'addBookmark', payload })
        }
      })
      .catch(err => {
        dispatch({ type: 'apiError', payload: err })
      })
  }

  return (
    <div className="homepage">
      <div className="inputContainer">
        <p className="error-title">{state.error}</p>
        <input
          value={state.link}
          onChange={e => dispatch({ type: 'changeLink', payload: e.target.value })}
          placeholder="Entrez un lien"
        />
        <button
          onClick={handleFetchNoEmbed}
          disabled={state.link.length === 0}
        >
          Envoyer
        </button>
      </div>
      <div className="bookmarksContainer">
        <Bookmarks
          items={state.bookmarks}
        />
      </div>
    </div>
  );
}

export default HomePage;
