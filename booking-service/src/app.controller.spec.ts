import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return service status object', () => {
      const result = appController.getHello();

      expect(result).toHaveProperty('status', 'running');
      expect(result).toHaveProperty('service', 'booking-service');
      expect(result).toHaveProperty('endpoints');
    });
  });
});
