"use client";
import { Music } from "@/types/music";
import { Playlist } from "@/types/playlist";
import {
  getAllPlaylist,
  insertSongToPlaylist,
  removeSongFromPlaylist,
} from "@/utils/apiRequest";
import { DusrationFormat } from "@/utils/unitFormater";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MenuList {
  label: string;
  id: number;
}

interface MusicsPageProps {
  playlist: Playlist;
}

export default function MusicListTable({ playlist }: MusicsPageProps) {
  const router = useRouter();
  // Menu states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const musics = playlist.musics;

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
  const assignToPlaylist = async (music_id: number, playlist_id?: number) => {
    if (playlist_id) {
      const res = await insertSongToPlaylist({
        playlist_id,
        user_id: 1, // replace with current user id
        music_id: music_id,
      });
      if (res) {
        setIsAddMenuOpen(false);
        // optional: show toast/notification
      }
    } else {
      const res = await insertSongToPlaylist({
        user_id: 1, // replace with current user id
        music_id: music_id,
      });
      if (res) {
        setIsAddMenuOpen(false);
        // optional: show toast/notification
      }
    }
  };

  const deleteFromPlaylist = async (music_id: number, playlist_id: number) => {
    const res = await removeSongFromPlaylist({
      music_id,
      playlist_id,
    });
    if (res) {
      setIsAddMenuOpen(false);
      router.refresh();
      // optional: show toast/notification
    }
  };

  // Menu actions
  const listMenu = [
    { label: "Add to playlist", icon: "add", action: () => toggleAddMenu() },
    {
      label: "Remove from this playlist",
      icon: "delete",
      action: () => () => null,
    },
    {
      label: "Save to your Liked Songs",
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

  if (musics.length == 0) {
    return (
      <Table aria-label="Example empty table" fullWidth rowHeight={50}>
        <TableHeader>
          <TableColumn align="start">#</TableColumn>
          <TableColumn align="start" width={400}>
            Title
          </TableColumn>
          <TableColumn align="start">Album</TableColumn>
          <TableColumn>Date Add</TableColumn>
          <TableColumn>Duration</TableColumn>
          <TableColumn> </TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Song to display."}>{[]}</TableBody>
      </Table>
    );
  }
  return (
    <Table
      aria-label="Example static collection table"
      fullWidth
      rowHeight={50}
      selectionMode="single"
    >
      <TableHeader>
        <TableColumn align="center">#</TableColumn>
        <TableColumn align="start" width={400}>
          Title
        </TableColumn>
        <TableColumn align="center" width={300}>
          Album
        </TableColumn>
        <TableColumn align="center">Date Add</TableColumn>
        <TableColumn align="center">Duration</TableColumn>
        <TableColumn align="center" width={10}>
          {" "}
        </TableColumn>
      </TableHeader>
      <TableBody>
        {musics.map((item, idx) => (
          <TableRow key={item.id}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.album?.title ?? "-"}</TableCell>
            <TableCell>{item.updated_at.slice(0, 10)}</TableCell>
            <TableCell>{DusrationFormat(item.duration)}</TableCell>
            <TableCell>
              <div className="relative">
                <div className="cursor-pointer" onClick={toggleMenu}>
                  <span
                    className="material-symbols-outlined text-gray-400"
                    style={{ fontSize: "32px" }}
                  >
                    more_horiz
                  </span>
                </div>
                {isMenuOpen && (
                  <div className="absolute z-20 right-0 bg-black w-[250px] h-fit p-2 rounded-xl">
                    {listMenu.map((menu, idx_2) => (
                      <div
                        key={idx_2}
                        onClick={
                          menu.icon == "delete"
                            ? () => deleteFromPlaylist(item.id, playlist.id)
                            : menu.action
                        }
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
                  <div className="absolute z-20 right-0 -translate-x-[258px] bg-black w-[250px] h-fit p-2 rounded-xl">
                    <div
                      key={-1}
                      onClick={() => assignToPlaylist(item.id)}
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
                    {playlistMenu.map((pl, idx_3) => (
                      <div
                        key={idx_3}
                        onClick={() => assignToPlaylist(item.id, pl.id)}
                        className="flex items-center gap-4 p-2 hover:bg-gray-700 cursor-pointer"
                      >
                        <p className="text-xs">
                          {pl.label} <span>{`#${idx_3 + 1}`}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
