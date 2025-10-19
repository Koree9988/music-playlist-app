-- DropForeignKey
ALTER TABLE "music" DROP CONSTRAINT "music_album_id_fkey";

-- DropForeignKey
ALTER TABLE "plalist_music" DROP CONSTRAINT "plalist_music_musicId_fkey";

-- DropForeignKey
ALTER TABLE "plalist_music" DROP CONSTRAINT "plalist_music_playlistId_fkey";

-- DropForeignKey
ALTER TABLE "playlist" DROP CONSTRAINT "playlist_user_id_fkey";

-- AddForeignKey
ALTER TABLE "playlist" ADD CONSTRAINT "playlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plalist_music" ADD CONSTRAINT "plalist_music_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plalist_music" ADD CONSTRAINT "plalist_music_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "music"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "music" ADD CONSTRAINT "music_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE;
