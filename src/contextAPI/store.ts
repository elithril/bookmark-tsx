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
        // fetchInformations('https://vimeo.com/76979871');
      return { ...state, link: action.payload };
    case "addBookmark":
        const tmp = [...state.bookmarks];
        tmp.push(action.payload);
        return {...state, bookmarks: tmp, error: ''}
    case "removeBookmark":
        // remove avec l'index dans le payload
        return {...state, error: ''}
    case "apiError":
        return {...state, error: action.payload}
    default:
      throw new Error();
  }
}

export const CountContext = ctx;
export const CtxBookmarksProvider = BookmarksProvider;