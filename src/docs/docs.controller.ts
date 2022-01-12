import { Controller, Get, Header, UseGuards } from '@nestjs/common';
import { createReadStream } from 'fs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { join } from 'path';

@UseGuards(JwtAuthGuard)
@Controller('docs')
export class DocsController {

  @Get('pdf')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename=docs.pdf')
  pdf() {
    const path = join(__dirname, '../../docs/docs.pdf');
    return createReadStream(path);
  }
}
