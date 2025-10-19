"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Music } from "@/types/music";
import { Playlist } from "@/types/playlist";
import { getAllPlaylist, insertSongToPlaylist } from "@/utils/apiRequest";
import { DusrationFormat } from "@/utils/unitFormater";

interface MenuList {
  label: string;
  id: number;
}

interface MusicPageProps {
  music: Music;
}

export const MusicPage = ({ music }: MusicPageProps) => {
  const router = useRouter();

  // Menu states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  // Playlist state
  const [playlistMenu, setPlaylistMenu] = useState<MenuList[]>([]);

  // Fetch playlists on mount
  useEffect(() => {
    const fetchPlaylists = async () => {
      const playlists: Playlist[] = await getAllPlaylist(1);
      setPlaylistMenu(
        playlists.map((p) => ({
          label: p.name,
          id: p.id,
        }))
      );
    };
    fetchPlaylists();
  }, []);

  // Assign song to playlist
  const assignToPlaylist = async (playlist_id?: number) => {
    if (playlist_id) {
      const res = await insertSongToPlaylist({
        playlist_id,
        user_id: 1, // replace with current user id
        music_id: music.id,
      });
      if (res) {
        setIsAddMenuOpen(false);
        // optional: show toast/notification
      }
    } else {
      const res = await insertSongToPlaylist({
        user_id: 1, // replace with current user id
        music_id: music.id,
      });
      if (res) {
        setIsAddMenuOpen(false);
        // optional: show toast/notification
      }
    }
  };

  // Menu actions
  const listMenu = [
    { label: "Add to playlist", icon: "add", action: () => toggleAddMenu() },
    {
      label: "Add to your Liked Songs",
      icon: "add_circle",
      action: () => null,
    },
    {
      label: "Exclude from your taste profile",
      icon: "cancel",
      action: () => null,
    },
    { label: "Go to song radio", icon: "bigtop_updates", action: () => null },
    { label: "Go to artist", icon: "artist", action: () => null },
    { label: "Go to album", icon: "album", action: () => null },
    { label: "Share", icon: "ios_share", action: () => null },
  ];

  // Toggle menu helpers
  const toggleMenu = () => {
    setIsMenuOpen((old) => !old);
    setIsAddMenuOpen(false);
  };
  const toggleAddMenu = () => {
    setIsAddMenuOpen((old) => !old);
    // setIsMenuOpen(false);
  };

  return (
    <div className="rounded-lg">
      {/* Header */}
      <div className="p-4 bg-gradient-to-b from-red-700 to-[#23262B]">
        <div className="grid grid-cols-10 gap-8 p-4 h-fit">
          {/* Album cover */}
          <div className="col-span-2 min-w-[200px] min-h-[200px] max-h-[220px] relative">
            <Image
              src={music.image_url}
              alt="album cover"
              fill
              className="object-cover rounded-xl"
            />
          </div>

          {/* Song info */}
          <div className="col-span-8 row content-end">
            <p className="text-xs">Song</p>
            <p className="text-5xl my-4">{music.title}</p>
            <p>
              <span>{music.artist}</span> *{" "}
              {`${new Date(music.publish_at).getFullYear()} * ${DusrationFormat(
                music.duration
              )}`}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="col-span-10 flex gap-4 h-fit p-4 relative">
          <button className="size-12 rounded-full bg-green-600">
            <span
              className="material-symbols-outlined text-black"
              style={{ fontSize: "48px" }}
            >
              play_circle
            </span>
          </button>

          <button className="rounded-full">
            <span
              className="material-symbols-outlined text-gray-400"
              style={{ fontSize: "32px" }}
            >
              add_circle
            </span>
          </button>

          <button className="rounded-full">
            <span
              className="material-symbols-outlined text-gray-400"
              style={{ fontSize: "32px" }}
            >
              arrow_circle_down
            </span>
          </button>

          {/* More menu */}
          <div className="relative">
            <button className="rounded-full" onClick={toggleMenu}>
              <span
                className="material-symbols-outlined text-gray-400"
                style={{ fontSize: "32px" }}
              >
                more_horiz
              </span>
            </button>

            {isMenuOpen && (
              <div className="absolute z-20 bg-black w-[250px] h-fit p-2 rounded-xl">
                {listMenu.map((menu, idx) => (
                  <div
                    key={idx}
                    onClick={menu.action}
                    className="flex items-center gap-4 p-2 hover:bg-gray-700 cursor-pointer"
                  >
                    <span
                      className="material-symbols-outlined text-gray-400"
                      style={{ fontSize: "18px" }}
                    >
                      {menu.icon}
                    </span>
                    <p className="text-xs">{menu.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Add to playlist menu */}
            {isAddMenuOpen && (
              <div className="absolute z-20 translate-x-[258px] bg-black w-[250px] h-fit p-2 rounded-xl">
                <div
                  key={-1}
                  onClick={() => assignToPlaylist()}
                  className="flex items-center gap-4 p-2 hover:bg-gray-700 cursor-pointer"
                >
                  <span
                    className="material-symbols-outlined text-gray-400"
                    style={{ fontSize: "18px" }}
                  >
                    add
                  </span>
                  <p className="text-xs">New playlist</p>
                </div>
                {playlistMenu.map((pl, idx) => (
                  <div
                    key={idx}
                    onClick={() => assignToPlaylist(pl.id)}
                    className="flex items-center gap-4 p-2 hover:bg-gray-700 cursor-pointer"
                  >
                    <p className="text-xs">
                      {pl.label} <span>{`#${idx + 1}`}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lyrics and artist */}
      <div className="bg-[#23262B] min-h-[60dvh] grid grid-cols-3 p-8">
        <div className="col-span-2">
          <p className="text-2xl font-semibold my-4">Lyrics</p>
          <p>Lorem ipsum dolor sit amet,</p>
          <p>Echoes in the midnight air,</p>
          <p>Consectetur dreams I can’t forget,</p>
          <p>Whispered hearts that never care.</p>
          <p>Viverra nunc the stars align,</p>
          <p>Sed ut pain we leave behind,</p>
          <p>In shadows long, we fade, we climb,</p>
          <p>Into the sound, we lose our mind.</p>
        </div>

        <div className="col-span-1 flex gap-4 items-center">
          <div>
            <button className="rounded-full">
              <span
                className="material-symbols-outlined text-gray-400"
                style={{ fontSize: "32px" }}
              >
                artist
              </span>
            </button>
          </div>
          <div>{music.artist}</div>
        </div>
      </div>
    </div>
  );
};
