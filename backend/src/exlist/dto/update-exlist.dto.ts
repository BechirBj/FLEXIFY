import { PartialType } from '@nestjs/mapped-types';
import { CreateExlistDto } from './create-exlist.dto';

export class UpdateExlistDto extends PartialType(CreateExlistDto) {}
