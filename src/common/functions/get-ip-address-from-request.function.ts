import { Request } from 'express';
import { InternalServerErrorException } from '@nestjs/common';

// Regex to extract an IP Address from request.ip
const ipAddressFromRequestIpPattern = /(?<=[\w:]+)(?<ipAddress>[\d.]+)/;

// Function to get an IP Address from a Request Object
export function getIpAddressFromRequest(request: Request): string {
  const { ipAddress } =
    request.ip.match(ipAddressFromRequestIpPattern)?.groups || {};

  if (!ipAddress)
    throw new InternalServerErrorException('Unable to obtain IP Address');

  return ipAddress;
}
