import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  findAll() {
    return `this is file `;
  }
}
