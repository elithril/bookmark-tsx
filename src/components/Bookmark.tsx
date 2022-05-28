import React from 'react';
import { FlickrItem, VimeoItem } from '../interfaces/bookmarksInterfaces';
import './bookmark.css';

interface BookmarksProps {
  items: (VimeoItem|FlickrItem)[];
  removeBookmark: (index: number) => void;
}

export default function Bookmarks({ items, removeBookmark }: BookmarksProps) {

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  
  function convertMsToTime(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    minutes = minutes % 60;
  
    if (hours === 0 && minutes === 0) {
      return "Il y a moins d'une minute"
    } else if (hours === 0 && minutes > 0) {
      return `Il y a ${padTo2Digits(minutes)} minute${minutes > 1 ? 's' : ''}`
    } else {
      return `Il y a ${padTo2Digits(hours)} heures et ${padTo2Digits(minutes)} minute${minutes > 1 ? 's' : ''}`
    }
  }

  return (
    <div>
      {items.map((item, index) => {
        const formatedAddedTime = convertMsToTime(item.added_time.getTime() - item.added_date.getTime())
        if ("duration" in item)
          return (
            <div
              key={`vimeo-item-${index + 1}`}
              className="item-container"
            >
              <button
                onClick={() => removeBookmark(index)}
              >
                remove bookmark
              </button>
              <img
                src={item.thumbnail_url}
                alt={`vimeo-thumbnail-${item.title}`}
              />
              <p>url: {item.url}</p>
              <p>titre: {item.title}</p>
              <p>author: {item.author_name}</p>
              <p>added date: {formatedAddedTime}</p>
              <p>upload date: {item.upload_date.toString()}</p>
              <p>duration: {item.duration}</p>
            </div>
          );

        return (
          <div
            key={`flickr-item--${index + 1}`}
            className="item-container"
          >
            <button
              onClick={() => removeBookmark(index)}
            >
              remove bookmark
            </button>
            <img
              src={item.thumbnail_url}
              alt={`flickr-thumbnail-${item.title}`}
            />
            <p>url: {item.url}</p>
            <p>title: {item.title}</p>
            <p>author: {item.author_name}</p>
            <p>added date: {formatedAddedTime}</p>
            <p>dimensions: {item.width} x {item.height}</p>
          </div>
        );
      })}
    </div>
  );
}