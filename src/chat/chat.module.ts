import { Module } from '@nestjs/common';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Chat, ChatSchema } from 'src/schemas/chat.schema';
import { Message, MessageSchema } from 'src/schemas/message.schema';
import { AuthModule } from 'src/auth/auth.module';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import {
  MediaContent,
  MediaContentSchema,
} from 'src/schemas/mediaContent.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { LivekitModule } from 'src/liveKit/liveKit.module';
import { NotificationModule } from 'src/notification/notification.module';
import { SharedModule } from 'src/Shared/shared.module';
@Module({
  imports: [
    AuthModule,
    NotificationModule,
    CloudinaryModule,
    LivekitModule,
    // SharedModule,
    SharedModule.registerRmq('NOTIFICATION_SERVICE', 'NOTIFICATION'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema },
      { name: MediaContent.name, schema: MediaContentSchema },
    ]),
  ],
  providers: [ChatResolver, MessageResolver, ChatService, MessageService],
})
export class ChatModule {}
