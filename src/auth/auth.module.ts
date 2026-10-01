import { Module } from '@nestjs/common';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './auth.cli.js';
import { AuthController } from './auth.controller.js';

@Module({
	imports: [BetterAuthModule.forRoot({ auth })],
	controllers: [AuthController],
})
export class AuthModule {}
