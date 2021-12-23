import { Test, TestingModule } from '@nestjs/testing';
import { GeoapifyService } from './geoapify.service';

describe('GeoapifyService', () => {
  let service: GeoapifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoapifyService],
    }).compile();

    service = module.get<GeoapifyService>(GeoapifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
