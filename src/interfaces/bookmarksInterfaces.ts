export interface VimeoItem {
    thumbnail_url?: string,
    url: string,
    title: string,
    author_name: string,
    added_date: Date,
    upload_date: Date,
    duration: string,
    error?: string,
}

export interface FlickrItem {
    thumbnail_url: string,
    url: string,
    title: string,
    author_name: string,
    added_date: Date,
    height: number,
    width: number,
    error?: string
}