import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import type { Request } from 'express';
import { SessionGuard } from '../../common/guards/session.guard.js';
import type { CreateTaskDto } from './dto/create-task.dto.js';
import type { ListTaskDto } from './dto/list-task.dto.js';
import type { UpdateTaskDto } from './dto/update-task.dto.js';
import { TasksService } from './tasks.service.js';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(SessionGuard)
@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: 'Créer une tâche', description: 'Créer une nouvelle tâche pour l\'utilisateur connecté' })
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				title: { type: 'string', example: 'Ma première tâche' },
				description: { type: 'string', example: 'Description de la tâche' },
				priority: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'], example: 'MEDIUM' },
			},
			required: ['title', 'priority'],
		},
	})
	@ApiResponse({ status: 201, description: 'Tâche créée avec succès' })
	@ApiResponse({ status: 401, description: 'Non authentifié' })
	create(@Body() dto: CreateTaskDto, @Req() req: Request & { user: { id: string } }) {
		return this.tasksService.create(req.user.id, dto);
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Lister les tâches', description: 'Récupérer toutes les tâches de l\'utilisateur connecté' })
	@ApiResponse({ status: 200, description: 'Liste des tâches' })
	@ApiResponse({ status: 401, description: 'Non authentifié' })
	findAll(@Query() filters: ListTaskDto, @Req() req: Request & { user: { id: string } }) {
		return this.tasksService.findAll(req.user.id, filters);
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Récupérer une tâche', description: 'Récupérer une tâche spécifique par son ID' })
	@ApiResponse({ status: 200, description: 'Tâche trouvée' })
	@ApiResponse({ status: 401, description: 'Non authentifié' })
	@ApiResponse({ status: 404, description: 'Tâche non trouvée' })
	findOne(@Param('id') id: string, @Req() req: Request & { user: { id: string } }) {
		return this.tasksService.findOne(req.user.id, id);
	}

	@Patch(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Modifier une tâche', description: 'Modifier une tâche existante' })
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				title: { type: 'string', example: 'Titre modifié' },
				description: { type: 'string', example: 'Description modifiée' },
				priority: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'], example: 'HIGH' },
				completed: { type: 'boolean', example: false },
			},
		},
	})
	@ApiResponse({ status: 200, description: 'Tâche modifiée avec succès' })
	@ApiResponse({ status: 401, description: 'Non authentifié' })
	@ApiResponse({ status: 404, description: 'Tâche non trouvée' })
	update(@Param('id') id: string, @Body() dto: UpdateTaskDto, @Req() req: Request & { user: { id: string } }) {
		return this.tasksService.update(req.user.id, id, dto);
	}

	@Patch(':id/completed')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Marquer comme terminée', description: 'Marquer une tâche comme terminée' })
	@ApiResponse({ status: 200, description: 'Tâche marquée comme terminée' })
	@ApiResponse({ status: 401, description: 'Non authentifié' })
	@ApiResponse({ status: 404, description: 'Tâche non trouvée' })
	complete(@Param('id') id: string, @Req() req: Request & { user: { id: string } }) {
		return this.tasksService.complete(req.user.id, id);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Supprimer une tâche', description: 'Supprimer une tâche existante' })
	@ApiResponse({ status: 200, description: 'Tâche supprimée avec succès' })
	@ApiResponse({ status: 401, description: 'Non authentifié' })
	@ApiResponse({ status: 404, description: 'Tâche non trouvée' })
	remove(@Param('id') id: string, @Req() req: Request & { user: { id: string } }) {
		return this.tasksService.remove(req.user.id, id);
	}
}
