"use client";
import { Music } from "@/types/music";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const MusicList = ({
  musics,
  title,
}: {
  musics: Music[];
  title: string;
}) => {
  const router = useRouter();
  if (!musics) return <></>;

  const handleClick = (id: number) => {
    router.push(`/music/${id}`);
  };

  return (
    <div>
      <div className="text-2xl font-semibold my-4">{title}</div>
      <div className="grid grid-cols-7 gap-4 ">
        {musics.map((item, idx) => {
          return (
            <div
              key={idx}
              className="col-span-1 rounded-lg hover:bg-gray-800 p-2 cursor-pointer"
              onClick={() => handleClick(item.id)}
            >
              {/* <MusicCard music={item} /> */}
              <div className="relative aspect-square min-w-[160px] max-w-[195px]">
                <Image
                  src={item.image_url}
                  alt="album cover"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <div className="mt-4">
                <p className="text-sm">{item.title}</p>
                <p className="text-sm">{`${
                  item.artist.length > 16
                    ? item.artist.slice(0, 16) + "..."
                    : item.artist
                }`}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
