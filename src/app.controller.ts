import {
  Controller,
  Get,
  Render,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { groceryList } from './common/basic-menu';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private userService: UsersService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  @Render('index')
  async root(@Request() req, @Response() res) {
    if (!req.user) {
      res.redirect('/login');
    }

    const menu = await this.userService.getUserMenu(req.user.id);

    return {
      username: req.user.username,
      menu: menu,
      groceryList,
    };
  }
}
