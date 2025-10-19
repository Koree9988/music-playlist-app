import { Test, TestingModule } from '@nestjs/testing';
import { MusicPlaylistService } from './music-playlist.service';

describe('MusicPlaylistService', () => {
  let service: MusicPlaylistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicPlaylistService],
    }).compile();

    service = module.get<MusicPlaylistService>(MusicPlaylistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
