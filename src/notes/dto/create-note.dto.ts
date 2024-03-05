import { IsNotEmpty, IsString, MaxLength, IsUUID } from 'class-validator'

export class CreateNoteDto {
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsUUID(4, { message: 'Invalid request' })
  @IsString()
  @IsNotEmpty()
  user_id: string
}
