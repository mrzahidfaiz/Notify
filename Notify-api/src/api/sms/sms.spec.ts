import { Test, TestingModule } from '@nestjs/testing';
import { SMSService } from './sms.service';

describe('Sms', () => {
  let provider: SMSService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SMSService],
    }).compile();

    provider = module.get<SMSService>(SMSService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
