import NotFoundUser from "@/components/error-style/NotFoundUser";
import { PlaylistComponent } from "@/components/playlist/Playlist";
import { Playlist } from "@/types/playlist";
import { getPlaylistById } from "@/utils/apiRequest";

export default async function PlaylistPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const playlist: Playlist | null = await getPlaylistById(id);

  if (!playlist) return <NotFoundUser />;
  return <PlaylistComponent playlist={playlist} />;
}
