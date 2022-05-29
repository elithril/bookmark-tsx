import { FlickrItem, VimeoItem } from "../interfaces/bookmarks-interfaces";

export const fetchInformations = async (link: string): Promise<VimeoItem | FlickrItem> => {
  try {
    const res = await fetch(
      `https://noembed.com/embed?url=${link}`
    );
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  } catch (err) {
    return Promise.reject(err)
  }
}