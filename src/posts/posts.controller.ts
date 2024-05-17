import { Body, Controller, Post } from '@nestjs/common'
import { CreatePostDto } from './dtos/createposts.dto';
import { PostService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostService){}
    @Post()
    createPost(
        @Body() createPostDto: CreatePostDto){
            return this.postsService.createPost(createPostDto)
        }
}