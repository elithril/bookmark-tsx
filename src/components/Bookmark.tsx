import React from 'react';
import { BookmarksContext } from '../contextAPI/bookmark-context';
import { FlickrItem, VimeoItem } from '../interfaces/bookmarks-interfaces';
import { convertMsToTime } from '../utils/convert-time';
import './bookmark.css';

interface BookmarksProps {
  items: (VimeoItem | FlickrItem)[];
}

interface TopContainerInformationsProps {
  index: number,
  addedTime: Date,
  addedDate: Date,
  author: string,
}

export default function Bookmarks({ items }: BookmarksProps) {
  const { dispatch } = React.useContext(BookmarksContext);

  const handleRemoveBookmark = (index: number) => {
    dispatch({ type: "removeBookmark", payload: index })
  }

  const TopContainerInformations = ({ index, addedTime, addedDate, author }: TopContainerInformationsProps) => {
    const formatedAddedTime = convertMsToTime(addedTime.getTime() - addedDate.getTime())

    return (
      <div className="flex-alignment">
        <div className="flex-column">
          <p>Ajouté {formatedAddedTime}</p>
          <p>Auteur: {author}</p>
        </div>
        <button
          onClick={() => handleRemoveBookmark(index)}
          className="remove-bookmark-button"
        >
          Supprimer
        </button>
      </div>
    )
  }

  return (
    <div>
      {items.map((item, index) => {
        const { added_time, added_date, author_name } = item;
        if ("duration" in item)
          // if duration property exist, it's a VimeoItem
          return (
            <div
              key={`vimeo-item-${index + 1}`}
              className="item-container"
            >
              <TopContainerInformations
                index={index}
                addedTime={added_time}
                addedDate={added_date}
                author={author_name}
              />
              <p className="bookmark-title">
                {item.title}
              </p>
              <img
                src={item.thumbnail_url}
                alt={`vimeo-thumbnail-${item.title}`}
                className="bookmark-thumbnail"
              />
              <p className="bookmark-video-duration">
                Durée: {item.duration}
              </p>
              <div className="flex-alignment">
                <p className="bookmark-url">
                  Url: {item.url}
                </p>
                <p className="bookmark-upload-date">
                  Date de publication: Le {item.upload_date}
                </p>
              </div>
            </div>
          );

        //else it's a FlickrItem
        return (
          <div
            key={`flickr-item-${index + 1}`}
            className="item-container"
          >
            <TopContainerInformations
              index={index}
              addedTime={added_time}
              addedDate={added_date}
              author={author_name}
            />
            <p className="bookmark-title">
              {item.title}
            </p>
            <img
              src={item.thumbnail_url}
              alt={`flickr-thumbnail-${item.title}`}
              className="bookmark-thumbnail"
            />
            <p className="bookmark-image-dimensions">
              Dimensions: {item.width} x {item.height}
            </p>
            <div className="flex-alignment">
              <p className="bookmark-url">
                Url: {item.url}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}