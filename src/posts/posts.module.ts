import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/schemas/Post.schema';
import { PostsController } from './posts.controller';
import { PostService } from './posts.service';
import { User, UserScheme } from 'src/schemas/schemas.module';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Post.name,
            schema: PostSchema
        },
        {
            name: User.name,
            schema: UserScheme
        }
    ])
    ],
    controllers: [PostsController],
    providers: [PostService],
})
export class PostsModule {

}
