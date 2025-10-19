import NotFoundUser from "@/components/error-style/NotFoundUser";
import { HomePage } from "@/components/style-home/HomePage";
import { getAllPlaylist, getMusic, getUser } from "@/utils/apiRequest";

export default async function Home() {
  const user = await getUser(1);
  const playlist = await getAllPlaylist(1);

  if (!user) return <NotFoundUser />;

  const musics = await getMusic();

  return <HomePage musics={musics} playlists={playlist} />;
}
