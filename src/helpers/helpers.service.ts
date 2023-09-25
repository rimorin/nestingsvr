import { Injectable } from '@nestjs/common';

@Injectable()
export class HelpersService {
    getOffset(page = 1, pageSize: number) {
        return (page - 1) * pageSize;
    }

    getTotalPages(total: number, pageSize: number) {
        return Math.ceil(total / pageSize);
    }
}
