import { Controller, Get } from "@nestjs/common";
import { Public, RoleMatchingMode, Roles } from "nest-keycloak-connect";

@Controller()
export class AppController {
    constructor() {}

    @Get()
    @Public()
    public(): string {
        return "This is public";
    }

    @Get("unauthorized")
    unauthorized(): string {
        return "You shouldn't see this";
    }

    @Roles({ roles: ["user"] })
    @Get("user")
    user(): string {
        return "user";
    }

    @Roles({ roles: ["admin"], mode: RoleMatchingMode.ALL })
    @Get("admin")
    admin(): string {
        return "admin";
    }
}
