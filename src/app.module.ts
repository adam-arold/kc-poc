import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import {
    AuthGuard,
    KeycloakConnectModule,
    PolicyEnforcementMode,
    ResourceGuard,
    RoleGuard,
    TokenValidation,
} from "nest-keycloak-connect";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    imports: [
        KeycloakConnectModule.register({
            authServerUrl: "http://localhost:8080",
            realm: "master",
            clientId: "kc",
            secret: "P4XupAM0blB3AYBcgUfpdCalIxwuFR7z",
            cookieKey: "KEYCLOAK_JWT",
            logLevels: ["verbose"],
            policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
            tokenValidation: TokenValidation.ONLINE,
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: ResourceGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },
    ],
})
export class AppModule {}
