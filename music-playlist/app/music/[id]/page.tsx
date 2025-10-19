/* eslint-disable @typescript-eslint/no-explicit-any */
import NotFoundUser from "@/components/error-style/NotFoundUser";
import { MusicPage } from "@/components/musics/MusicPage";
import { Music } from "@/types/music";
import { getMusicById } from "@/utils/apiRequest";

export default async function MusicMainPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const music: Music | null = await getMusicById(id);

  if (!music) return <NotFoundUser />;
  return <MusicPage music={music} />;
}
