export interface VimeoItem {
    thumbnail_url?: string,
    url: string,
    title: string,
    author_name: string,
    added_date: Date,
    added_time: Date,
    upload_date: string,
    duration: string,
    error?: string,
}

export interface FlickrItem {
    thumbnail_url: string,
    url: string,
    title: string,
    author_name: string,
    added_date: Date,
    added_time: Date,
    height: number,
    width: number,
    error?: string
}