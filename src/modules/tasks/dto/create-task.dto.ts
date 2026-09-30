import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const prioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH']);
export const CreateTaskSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string().optional(),
	priority: prioritySchema,
});

export class CreateTaskDto extends createZodDto(CreateTaskSchema) {}
