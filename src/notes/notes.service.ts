import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { Note } from './entities/note.entity'

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private readonly noteModel: Model<Note>) {}

  async create(createNoteDto: CreateNoteDto): Promise<{ item: Note }> {
    const newItem = new this.noteModel(createNoteDto)
    const item = await newItem.save()
    return { item }
  }

  async findAll(query: { skip: number; take: number }): Promise<{ items: Note[]; count: number }> {
    const { skip, take } = query
    const [items, count] = await Promise.all([
      this.noteModel.find().skip(skip).limit(take).exec(),
      this.noteModel.find().countDocuments().exec()
    ])

    return { items, count }
  }

  async findOne(id: string): Promise<{ item: Note }> {
    const item = await this.noteModel.findById(id).exec()
    if (!item) throw new NotFoundException('Not found')
    return { item }
  }

  async update(id: string, UpdateNoteDto: UpdateNoteDto): Promise<{ item: Note }> {
    const item = await this.noteModel.findById(id).exec()
    if (!item) throw new NotFoundException('Not found')

    if (UpdateNoteDto.title) item.title = UpdateNoteDto.title
    if (UpdateNoteDto.content) item.content = UpdateNoteDto.content

    item.updated_at = new Date()

    await item.save()
    return { item }
  }

  async remove(id: string): Promise<{ item: Note }> {
    const item = await this.noteModel.findByIdAndDelete(id).exec()
    return { item }
  }
}
