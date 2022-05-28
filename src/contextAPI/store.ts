import { FlickrItem, VimeoItem } from "../interfaces/bookmarksInterfaces";
import { fetchInformations } from "../services/bookmarks";
import { createCtx } from "./contextCreator";

const initialState = { link: '', bookmarks: [] as (VimeoItem|FlickrItem)[], error: '' };

const [ctx, BookmarksProvider] = createCtx(reducer, initialState);

type AppState = typeof initialState;
type Action =
  | { type: "changeLink"; payload: string }
  | { type: "addBookmark"; payload: VimeoItem | FlickrItem}
  | { type: "apiError"; payload: string}
  | { type: "removeBookmark"; payload: number }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "changeLink":
      return { ...state, link: action.payload };
    case "addBookmark":
        const tmp = [...state.bookmarks];
        tmp.push(action.payload);
        return {...state, bookmarks: tmp, error: '', link: ''}
    case "removeBookmark":
        const splicedBookmarks = [...state.bookmarks];
        splicedBookmarks.splice(action.payload, 1);
        return {...state, error: '', bookmarks: splicedBookmarks}
    case "apiError":
        return {...state, error: action.payload}
    default:
      throw new Error();
  }
}

export const BookmarksContext = ctx;
export const CtxBookmarksProvider = BookmarksProvider;