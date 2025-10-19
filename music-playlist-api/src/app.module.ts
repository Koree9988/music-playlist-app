import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PlaylistModule } from './playlist/playlist.module';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { MusicModule } from './music/music.module';
import { MusicPlaylistModule } from './music-playlist/music-playlist.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoreModule,
    UserModule,
    PlaylistModule,
    MusicModule,
    MusicPlaylistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
