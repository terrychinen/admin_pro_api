import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const AuthJwt = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    delete request.user.password;
    return request.user;
});