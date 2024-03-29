import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { TenantService } from './tenant/tenant.service'

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private tenantService: TenantService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const subdomain = request.user.subdomain
    console.log(subdomain)
    await this.tenantService.setTenantBy(subdomain)
    return true
  }
}
