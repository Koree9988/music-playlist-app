import { Music } from "./music";

export interface Playlist {
  id: number;
  name: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  musics: Music[];
}
