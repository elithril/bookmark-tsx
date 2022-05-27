import { FlickrItem, VimeoItem } from "../interfaces/bookmarksInterfaces";

export const fetchInformations = async (link: string): Promise<VimeoItem|FlickrItem> => {
  // fetch from no embeded
  try {
    const res = await fetch(
        `https://noembed.com/embed?url=${link}`
    );
  if (!res.ok) throw new Error(res.statusText);
    return res.json();
  } catch (err) {
    console.log("err before =>", err)
    return Promise.reject(err)
  }
}