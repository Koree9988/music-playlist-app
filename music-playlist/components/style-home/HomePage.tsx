"use client";
import { Music } from "@/types/music";
import { MusicList } from "../musics/MusicList";
import { useTheme } from "next-themes";
import { UserPlaylist } from "../playlist/UserPlaylist";
import { Playlist } from "@/types/playlist";

export const HomePage = ({
  musics,
  playlists,
}: {
  musics: Music[];
  playlists: Playlist[];
}) => {
  const discoverPicks = musics.slice(0, 10);
  const recommendedPicks = musics.slice(4, 14);

  const { theme } = useTheme();
  return (
    <div
      className="grid grid-cols-12 gap-4 h-[100dvh] overflow-y-auto p-4 rounded-lg"
      style={{
        backgroundColor: theme === "light" ? "#ededed" : "#23262B",
        color: theme === "light" ? "#0a0a0a" : "#ededed",
      }}
    >
      <div className="col-span-12">
        <UserPlaylist playlists={playlists} title="Your Playlist" />
      </div>
      <div className="col-span-12">
        <MusicList musics={discoverPicks} title="Discover picks for you" />
      </div>
      <div className="col-span-12">
        <MusicList musics={recommendedPicks} title="Recommended for today" />
      </div>
    </div>
  );
};
