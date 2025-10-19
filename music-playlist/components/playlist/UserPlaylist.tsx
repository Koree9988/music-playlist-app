"use client";
import { Playlist } from "@/types/playlist";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const UserPlaylist = ({
  playlists,
  title,
}: {
  playlists: Playlist[];
  title: string;
}) => {
  const router = useRouter();
  if (!playlists) return <></>;

  const handleClick = (id: number) => {
    router.push(`/playlist/${id}`);
  };

  return (
    <div>
      <div className="text-2xl font-semibold my-4">{title}</div>
      <div className="grid grid-cols-7 gap-4 ">
        {playlists.map((item, idx) => {
          return (
            <div
              key={idx}
              className="col-span-1 rounded-lg hover:bg-gray-800 p-2 cursor-pointer"
              onClick={() => handleClick(item.id)}
            >
              {/* <MusicCard music={item} /> */}
              <div className="relative aspect-square min-w-[160px] max-w-[195px] bg-gray-300 flex items-center justify-center rounded-xl">
                {item.musics.length > 0 ? (
                  <Image
                    src={item.musics[0].image_url}
                    alt="album cover"
                    fill
                    className="object-cover rounded-xl"
                  />
                ) : (
                  <span
                    className="material-symbols-outlined text-gray-600"
                    style={{ fontSize: "64px" }}
                  >
                    library_music
                  </span>
                )}
              </div>

              <div className="mt-4">
                <p className="text-base">{item.name}</p>
                <p className="text-sm">{`${item.musics.length} Songs`}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
