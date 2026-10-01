import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { ZodValidationPipe } from 'nestjs-zod';
import { AppModule } from './app.module.js';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		bufferLogs: true,
	});
	app.useLogger(app.get(Logger));

	// Render est derrière un proxy : nécessaire pour les vraies IP (Throttler)
	app.set('trust proxy', 1);

	// CSP stricte par défaut, assouplie uniquement pour Swagger (/docs)
	const helmetStrict = helmet();
	const helmetDocs = helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				scriptSrc: ["'self'", "'unsafe-inline'"],
				styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
				imgSrc: ["'self'", 'data:', 'https:'],
				fontSrc: ["'self'", 'https:', 'data:'],
				upgradeInsecureRequests: null,
			},
		},
	});

	app.use((req: Request, res: Response, next: NextFunction) => {
		if (req.path.startsWith('/docs')) {
			return helmetDocs(req, res, next);
		}
		return helmetStrict(req, res, next);
	});

	app.useGlobalPipes(new ZodValidationPipe());

	const config = new DocumentBuilder()
		.setTitle('NexaFood API')
		.setVersion('0.1.0')
		.addBearerAuth()
		.build();
	SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));

	await app.listen(Number(process.env.PORT) || 3000, '0.0.0.0');
}

bootstrap();