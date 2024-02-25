import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';

import { AuthService } from './auth.service';

import { CreateUserDto, SignInDto, SignUpDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from './entities/user.entity';
import { SignInResponse } from './interfaces/sign-in-response';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto  ) {
    return this.authService.signIn( signInDto );
  }

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto  ) {
    return this.authService.signUp( signUpDto );
  }

  @UseGuards( AuthGuard )
  @Get()
  findAll( @Request() req: Request ) {
    const user = req['user'];

    return user;

  }

  @UseGuards( AuthGuard )
  @Get('/check-token')
  checkToken( @Request() req: Request ): SignInResponse{

    const user = req['user'] as User;

    return {
      user,
      token: this.authService.getJwtToken({ id: user._id })
    }

  }

  

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
