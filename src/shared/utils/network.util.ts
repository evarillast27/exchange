import { Request } from "express";

export const clientIp = (request: Request) => {
    
    let ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    return ip.toString().replace('::ffff:', '');
}