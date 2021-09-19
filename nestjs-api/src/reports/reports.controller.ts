import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface'
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'
import { TenantGuard } from 'src/tenant/tenant.guard'
import { CreateReportDto } from './dto/create-report.dto'
import { ReportsService } from './reports.service'

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Post()
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto)
  }

  @UseGuards(JwtAuthGuard, TenantGuard)
  @Get()
  findAll() {
    return this.reportsService.findAll()
  }

  @MessagePattern('reports-generated')
  async reportGenerated(@Payload() message: KafkaMessage) {
    const { id, ...others } = message.value as any
    await this.reportsService.update(id, others)
  }
}
