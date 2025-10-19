import { Test, TestingModule } from '@nestjs/testing';
import { MusicPlaylistController } from './music-playlist.controller';
import { MusicPlaylistService } from './music-playlist.service';

describe('MusicPlaylistController', () => {
  let controller: MusicPlaylistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicPlaylistController],
      providers: [MusicPlaylistService],
    }).compile();

    controller = module.get<MusicPlaylistController>(MusicPlaylistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
