import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module.js'; // adapte le chemin si besoin
import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';

@Module({
	imports: [PrismaModule],
	controllers: [TasksController],
	providers: [TasksService],
	exports: [TasksService], // utile si d'autres modules en ont besoin
})
export class TasksModule {}
