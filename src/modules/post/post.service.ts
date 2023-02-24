import { Post, PostDocument } from './../../Model/post.schema';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/post.create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetPostDto } from './dto/post.get.dto';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class PostService {

    constructor(@InjectModel(Post.name) private createPostModel: Model<PostDocument>){}


    async getUserIdFromAccessToken(accessToken: string): Promise<string> {
        const decodedToken: any = jwt.verify(accessToken, 'jwtConstants.secret');
    
        const userId: string = decodedToken.userId;
    
        return userId;
      }


    async create(createPostDto : CreatePostDto, id:string): Promise<CreatePostDto> {
        const {title , description} = createPostDto;

        const data = {
            title,
            description,
            devId : id
        }
        const postData = await this.createPostModel.create(data);
        return postData.save();
    }
    async getPost(id:string):Promise<GetPostDto[]>{
        const post =await this.createPostModel.find({id});
        if(post){
            return post;
        }
    }
}