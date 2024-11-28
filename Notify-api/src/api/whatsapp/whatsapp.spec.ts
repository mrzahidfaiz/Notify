import { Test, TestingModule } from '@nestjs/testing';
import { WhatsappService } from './whatsapp.service';

describe('Whatsapp', () => {
  let provider: WhatsappService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhatsappService],
    }).compile();

    provider = module.get<WhatsappService>(WhatsappService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
