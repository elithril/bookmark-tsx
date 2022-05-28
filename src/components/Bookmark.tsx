import React from 'react';
import { FlickrItem, VimeoItem } from '../interfaces/bookmarksInterfaces';
import './bookmark.css';

interface BookmarksProps {
  items: (VimeoItem|FlickrItem)[];
  removeBookmark: (index: number) => void;
}

export default function Bookmarks({ items, removeBookmark }: BookmarksProps) {

  return (
    <div>

      {items.map((item, index) => {
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
              <p>added date: {item.added_date.toUTCString()}</p>
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
            <p>added date: {item.added_date.toUTCString()}</p>
            <p>dimensions: {item.width} x {item.height}</p>
          </div>
        );
      })}
    </div>
  );
}