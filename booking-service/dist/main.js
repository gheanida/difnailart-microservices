"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors();
        console.log('🔄 Connecting to RabbitMQ...');
        try {
            app.connectMicroservice({
                transport: microservices_1.Transport.RMQ,
                options: {
                    urls: ['amqp://rabbitmq:5672'],
                    queue: 'booking_queue',
                    queueOptions: {
                        durable: false,
                    },
                },
            });
            console.log('✅ Connected to RabbitMQ');
        }
        catch (error) {
            console.warn('⚠️ Failed to connect to RabbitMQ, continuing without microservice:', error.message);
        }
        await app.startAllMicroservices();
        await app.listen(3002);
        console.log(`🚀 Booking Service is running on: ${await app.getUrl()}`);
    }
    catch (error) {
        console.error('❌ Failed to start Booking Service:', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map