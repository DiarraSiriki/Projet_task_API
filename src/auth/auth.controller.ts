import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import type { Request, Response } from 'express';
import { auth } from './auth.cli.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor() {}

	@AllowAnonymous()
	@Post('sign-up/email')
	@ApiOperation({
		summary: 'Inscription utilisateur',
		description: 'Créer un nouveau compte avec email et mot de passe',
	})
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				email: { type: 'string', example: 'test@example.com' },
				password: { type: 'string', example: 'password123' },
				name: { type: 'string', example: 'Test User' },
			},
			required: ['email', 'password'],
		},
	})
	@ApiResponse({ status: 200, description: 'Utilisateur créé avec succès' })
	@ApiResponse({ status: 400, description: 'Données invalides' })
	async signUp(
		@Body() body: { email: string; password: string; name?: string },
		@Req() req: Request,
		@Res() res: Response,
	) {
		const result = await auth.api.signUpEmail({
			body: {
				email: body.email,
				password: body.password,
				name: body.name || '',
			},
			headers: req.headers as Record<string, string>,
		});
		res.status(200).json(result);
	}

	@AllowAnonymous()
	@Post('sign-in/email')
	@ApiOperation({
		summary: 'Connexion utilisateur',
		description: 'Se connecter avec email et mot de passe',
	})
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				email: { type: 'string', example: 'test@example.com' },
				password: { type: 'string', example: 'password123' },
			},
			required: ['email', 'password'],
		},
	})
	@ApiResponse({ status: 200, description: 'Connexion réussie, retourne le token de session' })
	@ApiResponse({ status: 401, description: 'Identifiants invalides' })
	async signIn(
		@Body() body: { email: string; password: string },
		@Req() req: Request,
		@Res() res: Response,
	) {
		const result = await auth.api.signInEmail({
			body: {
				email: body.email,
				password: body.password,
			},
			headers: req.headers as Record<string, string>,
		});
		res.status(200).json(result);
	}

	@AllowAnonymous()
	@Post('sign-out')
	@ApiOperation({ summary: 'Déconnexion', description: "Déconnecter l'utilisateur actuel" })
	@ApiResponse({ status: 200, description: 'Déconnexion réussie' })
	async signOut(@Req() req: Request, @Res() res: Response) {
		const result = await auth.api.signOut({
			headers: req.headers as Record<string, string>,
		});
		res.status(200).json(result);
	}

	@AllowAnonymous()
	@Get('session')
	@ApiOperation({
		summary: 'Session actuelle',
		description: 'Récupérer les informations de la session actuelle',
	})
	@ApiResponse({ status: 200, description: 'Informations de la session' })
	@ApiResponse({ status: 401, description: 'Non connecté' })
	async getSession(@Req() req: Request, @Res() res: Response) {
		const result = await auth.api.getSession({
			headers: req.headers as Record<string, string>,
		});
		if (!result) {
			res.status(401).json({ message: 'Non connecté' });
			return;
		}
		res.status(200).json(result);
	}
}
