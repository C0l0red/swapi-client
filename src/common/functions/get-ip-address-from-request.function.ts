import { Request } from 'express';
import { InternalServerErrorException } from '@nestjs/common';

const ipAddressFromRequestPattern = /(?<=[\w:]+)(?<ipAddress>[\d.]+)/;

export function getIpAddressFromRequest(request: Request): string {
  const { ipAddress } = request.ip.match(ipAddressFromRequestPattern)?.groups;

  if (!ipAddress)
    throw new InternalServerErrorException('Unable to obtain IP Address');

  return ipAddress;
}
