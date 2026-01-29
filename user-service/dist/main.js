"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const microservice = app.connectMicroservice({
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: ['amqp://rabbitmq:5672'],
            queue: 'user_queue',
            queueOptions: {
                durable: false,
            },
        },
    });
    await app.startAllMicroservices();
    await app.listen(3001);
    console.log(`🚀 User Service is running on: ${await app.getUrl()}`);
    console.log(`📨 RabbitMQ connected to: user_queue`);
}
bootstrap();
//# sourceMappingURL=main.js.map