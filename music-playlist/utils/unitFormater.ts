import { Music } from "@/types/music";

export const DusrationFormat = (totalSeconds: number) => {
  const sec = totalSeconds % 60;
  const min = (totalSeconds - sec) / 60;

  return `${min}:${sec}`;
};

export const secondsToTime = (totalSeconds: number) => {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return `about ${days > 0 ? days + " D" : ""} ${
    hours > 0 ? hours + " hr" : ""
  } ${minutes} min`;
};

export const totalPlaylistDuration = (musics: Music[]) => {
  if (musics.length == 0) return "about 0 min";
  let totalDuration = 0;
  musics.forEach((item) => (totalDuration += item.duration));
  const textDuaration = secondsToTime(totalDuration);
  return textDuaration;
};
