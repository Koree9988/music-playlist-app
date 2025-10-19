"use client";
import NotFoundUser from "@/components/error-style/NotFoundUser";
import MusicListTable from "@/components/playlist/MusicListTable";
import { Playlist } from "@/types/playlist";
import {
  delPlaylistById,
  getPlaylistById,
  patchPlaylistById,
} from "@/utils/apiRequest";
import { totalPlaylistDuration } from "@/utils/unitFormater";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export const PlaylistComponent = ({ playlist }: { playlist: Playlist }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setEditIsOpen] = useState(false);
  const [name, setName] = useState(playlist.name);
  const [loading, setLoading] = useState(false);
  const toggle = () => {
    setIsOpen((old) => !old);
  };

  const setClose = () => {
    if (isOpen) setIsOpen(false);
    if (isEditOpen) setEditIsOpen(false);
  };

  const deletePlaylist = async () => {
    const res = await delPlaylistById(Number(playlist.id));
    if (res) router.push("/");
  };

  const updatePlaylist = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // console.log("🚀 ~ name:", name);
    const res = await patchPlaylistById(Number(playlist.id), name);
    // console.log("🚀 ~ res:", res);

    if (res) {
      await setLoading(false);
      await setEditIsOpen(false);
      router.refresh();
    }
  };

  const listMenu = [
    {
      label: "Edit details",
      icon: "edit",
      action: () => setEditIsOpen((old) => !old),
    },
    {
      label: "Delete",
      icon: "do_not_disturb_on",
      action: () => deletePlaylist(),
    },
    { label: "Make private", icon: "lock", action: () => null },
    { label: "Invite claborators", icon: "person_add", action: () => null },
    {
      label: "Exclude from your taste profile",
      icon: "cancel",
      action: () => null,
    },
    { label: "Share", icon: "ios_share", action: () => null },
  ];
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const formRef = useRef<HTMLFormElement>(null);

  const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (formRef.current) {
      const rect = formRef.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setDragging(true);
    }
  };

  const onDrag = (e: React.MouseEvent<HTMLFormElement>) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const stopDrag = () => setDragging(false);

  return (
    <div className="rounded-lg w-full z-10">
      <div onClick={setClose}>
        <div className="p-4 bg-linear-to-b from-red-700 to-[#23262B] rounded-t-xl">
          <div className="flex flex-row gap-8 p-4 h-fit">
            <div className="relative aspect-square min-h-[200px] max-h-[220px] bg-gray-300 flex items-center justify-center rounded-xl">
              {playlist.musics.length > 0 ? (
                <Image
                  src={playlist.musics[0].image_url}
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
            <div className="flex-grow content-end ">
              <p>Playlist</p>
              <p className="text-5xl my-4">{playlist.name}</p>
              <p>
                <span className="font-semibold">Blank</span> *{" "}
                {`${playlist.musics.length} Songs * ${totalPlaylistDuration(
                  playlist.musics
                )}`}
              </p>
            </div>
          </div>

          <div className="col-span-10 flex gap-4 h-fit p-4">
            <button className="size-12 rounded-full bg-green-600 ">
              <span
                className="material-symbols-outlined text-black"
                style={{ fontSize: "48px" }}
              >
                play_circle
              </span>
            </button>

            {/* <button className=" rounded-full">
                    <span
                      className="material-symbols-outlined text-gray-400"
                      style={{ fontSize: "32px" }}
                    >
                      add_circle
                    </span>
                  </button> */}
            <button className="rounded-full">
              <span
                className="material-symbols-outlined text-gray-400"
                style={{ fontSize: "32px" }}
              >
                arrow_circle_down
              </span>
            </button>
            <div className="relative z-20">
              <button className=" rounded-full cursor-pointer" onClick={toggle}>
                <span
                  className="material-symbols-outlined text-gray-400"
                  style={{ fontSize: "32px" }}
                >
                  more_horiz
                </span>
              </button>
              {!isOpen ? (
                <></>
              ) : (
                <div className="absolute z-20 bg-black w-[250px] h-fit p-2 rounded-xl">
                  {listMenu.map((menu, idx) => {
                    return (
                      <div
                        key={idx}
                        onClick={menu.action}
                        className="flex flex-row gap-4 p-2 hover:bg-gray-700 cursor-pointer"
                      >
                        <span
                          className="material-symbols-outlined text-gray-400"
                          style={{ fontSize: "18px" }}
                        >
                          {menu.icon}
                        </span>
                        <p className="text-xs">{menu.label}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#23262B] min-h-[60dvh] w-full p-8">
          <MusicListTable playlist={playlist} />
        </div>
      </div>

      {!isEditOpen ? (
        <></>
      ) : (
        <form
          ref={formRef}
          onSubmit={updatePlaylist}
          onMouseMove={onDrag}
          onMouseUp={stopDrag}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            top: 50,
            left: 10,
            cursor: dragging ? "grabbing" : "grab",
          }}
          className="absolute z-20 top-[calc(50dvh-250px)] left-[calc(50dvw-250px)] bg-black text-white min-w-[500px] h-fit p-4 rounded-xl select-none"
        >
          <div onMouseDown={startDrag}>Edit details</div>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-2">
              <div className="relative aspect-square min-h-[200px] max-h-[220px] bg-gray-300 flex items-center justify-center rounded-xl">
                {playlist.musics.length > 0 ? (
                  <Image
                    src={playlist.musics[0].image_url}
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
            </div>
            <div className="col-span-3 flex flex-col gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter playlist name"
                className="border rounded px-2 py-1"
              />
              <input
                type="textarea"
                value=""
                placeholder="Playlist Description..."
                disabled
                className="border rounded px-2 py-1"
              />
            </div>
            <div className="col-span-5 text-right">
              <button
                type="submit"
                disabled={loading}
                className="text-lg p-4 bg-gray-400 text-white py-1 rounded-4xl hover:bg-gray-400"
              >
                {loading ? "Updating..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
