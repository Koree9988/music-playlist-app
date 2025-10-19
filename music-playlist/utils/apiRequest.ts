/* eslint-disable @typescript-eslint/no-unused-vars */
import { apiClient } from "./apiClient";

export const getUser = async (id: number) => {
  try {
    const client = await apiClient();
    const res = await client.get(`/user/${id}`);
    return res.data;
  } catch (error) {
    // console.log("🚀 ~ error:", error);
    return null;
  }
};

export const getMusic = async () => {
  try {
    const client = await apiClient();
    const res = await client.get("/music");
    return res.data;
  } catch (error) {
    // console.log("🚀 ~ error:", error);
    return [];
  }
};

export const getMusicById = async (id: number) => {
  try {
    const client = await apiClient();
    const res = await client.get(`/music/${id}`);
    return res.data;
  } catch (error) {
    // console.log("🚀 ~ error:", error);
    return null;
  }
};

export const getAllPlaylist = async (uId: number) => {
  try {
    const client = await apiClient();
    const res = await client.get(`/playlist?user_id=${uId}`);
    return res.data;
  } catch (error) {
    return [];
  }
};

export const getPlaylistById = async (id: number) => {
  try {
    const client = await apiClient();
    const res = await client.get(`/playlist/${id}`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const patchPlaylistById = async (id: number, name: string) => {
  try {
    const client = await apiClient();
    const res = await client.patch(`/playlist/${id}`, { name: name });
    console.log("🚀 ~ res.data:", res.data);
    return res.data;
  } catch (error) {
    // console.log("🚀 ~ error:", error.message);
    return null;
  }
};

export const delPlaylistById = async (id: number) => {
  try {
    const client = await apiClient();
    const res = await client.delete(`/playlist/${id}`);
    console.log("🚀 ~ res.data:", res.data);
    return res.data;
  } catch (error) {
    // console.log("🚀 ~ error:", error.message);
    return null;
  }
};

export const insertSongToPlaylist = async (payload: {
  playlist_id?: number | undefined;
  user_id: number;
  music_id: number;
}) => {
  try {
    const client = await apiClient();
    const res = await client.post(`/music-playlist`, payload);
    // console.log("🚀 ~ insertSongToPlaylist response:", res.data);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const removeSongFromPlaylist = async (payload: {
  music_id: number;
  playlist_id: number;
}) => {
  try {
    const client = await apiClient();
    const res = await client.delete(
      `/music-playlist/${payload.playlist_id}/${payload.music_id}`
    );
    // console.log("🚀 ~ insertSongToPlaylist response:", res.data);
    return res.data;
  } catch (error) {
    return null;
  }
};
