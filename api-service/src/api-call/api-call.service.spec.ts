import { Test, TestingModule } from '@nestjs/testing';
import { ApiCallService } from './api-call.service';

describe('ApiCallService', () => {
  let service: ApiCallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiCallService],
    }).compile();

    service = module.get<ApiCallService>(ApiCallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
