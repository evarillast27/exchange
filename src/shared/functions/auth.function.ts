import { JwtService } from "@nestjs/jwt"

export const decodeToken = (headers: any) => {
    const payload = headers.authorization.toString().replace('Bearer ', '');
    return (new JwtService()).decode(payload);
}