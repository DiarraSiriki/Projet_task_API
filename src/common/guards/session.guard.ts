import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { auth } from '../../auth/auth.cli.js';

@Injectable()
export class SessionGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request & { user?: unknown }>();
		const authorization = request.headers.authorization;

		if (!authorization || !authorization.startsWith('Bearer ')) {
			throw new UnauthorizedException('Token manquant ou invalide');
		}

		const token = authorization.replace('Bearer ', '');

		try {
			const session = await auth.api.getSession({
				headers: {
					authorization: `Bearer ${token}`,
				},
			});

			if (!session) {
				throw new UnauthorizedException('Session invalide ou expirée');
			}

			request.user = session.user;
			return true;
		} catch (error) {
			throw new UnauthorizedException('Session invalide ou expirée');
		}
	}
}
