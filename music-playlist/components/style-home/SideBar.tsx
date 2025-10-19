"use client";
import { Music } from "@/types/music";
import { MusicList } from "../musics/MusicList";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export const SideBar = ({ musics }: { musics: Music[] }) => {
  const discoverPicks = musics.slice(0, 10);
  const recommendedPicks = musics.slice(4, 14);

  const { theme } = useTheme();
  return (
    <div
      className="w-20 h-full rounded-lg flex flex-col gap-4 p-4"
      style={{
        backgroundColor: theme === "light" ? "#ededed" : "#23262B",
        color: theme === "light" ? "#0a0a0a" : "#ededed",
      }}
    >
      <div className="text-center">
        <span
          className="material-symbols-outlined text-gray-400"
          style={{ fontSize: "32px" }}
        >
          web_stories
        </span>
      </div>
    </div>
  );
};
