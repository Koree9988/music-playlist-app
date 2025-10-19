export interface Music {
  id: number;
  title: string;
  duration: number;
  album_id: number;
  artist: string;
  image_url: string;
  publish_at: string;
  created_at: string;
  updated_at: string;
  album: Album;
}

export interface Album {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}
