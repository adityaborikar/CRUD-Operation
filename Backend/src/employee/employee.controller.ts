/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { employee } from '@prisma/client';
import { EmployeeDto } from './dto/employee.dto';
import { EmployeeService } from './employee.service';
import { Response } from '../Interface/response'
import { JwtAuthGuard } from 'src/auth/jwt-auth.gaurd';

@Controller('employee')
@UseGuards(JwtAuthGuard)
export class EmployeeController {
    private logger = new Logger('EmployeeController');
    constructor(private readonly employeeService: EmployeeService) { }


    @Get()
    async getAll(): Promise<Response<employee[]>> {
        try {
            const employees = await this.employeeService.read()
            return {
                success: true,
                data: employees,
                message: 'Employees Fetched'
            }
        } catch (error) {
            console.log(error);
            this.logger.error(`error`)
        }
    }

    @Get("/:id")
    async getById(@Param('id', ParseIntPipe) id: number): Promise<Response<employee>> {
        try {
            const employees = await this.employeeService.readyById(id)
            return {
                success: true,
                data: employees,
                message: 'Employee Fetched'
            }
        } catch (error) {
            console.log(error);
            this.logger.error(error)
        }
    }

    @Post()
    async create(@Body() data: EmployeeDto): Promise<Response<employee>> {
        try {
            const employees = await this.employeeService.create(data);
            return {
                success: true,
                data: employees,
                message: 'Employee Created'
            }
        } catch (error) {
            console.log(error);
            this.logger.error(error)
        }
    }

    @Patch('/:id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: EmployeeDto
    ): Promise<Response<employee>> {
        try {
            const employees = await this.employeeService.update(id, data);
            return {
                success: true,
                data: employees,
                message: 'Employee Updated'
            }
        } catch (error) {
            console.log(error);
            this.logger.error(error)
        }
    }

    @Delete('delete/:id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<Response<employee>> {
        try {
            const employees = await this.employeeService.delete(id)
            return {
                success: true,
                data: employees,
                message: 'Employee Deleted'
            }
        } catch (error) {
            console.log(error)
            this.logger.error(error)
        }
    }
}
