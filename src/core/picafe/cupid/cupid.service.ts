import { Injectable } from '@nestjs/common';
import CreateRoom
import { CreateRoomDto } from './dto/create-room.dto';


export interface CupidServiceInterface {

  /**
   *  
   * 
   * 
   * 
   * kiryl {
      handles searching to create rooms
   * }
   * 
   * encryptionservice
   * supersecretservice || s3
   * 
   * 
   * bartek service -> emojis + giphy api
   * 
   * mountaineer service {
   *  connects to slack
   *  connects to point of contact: nishant
   * }
   * 
   * chatterbox service:
   *  chatterbox -> admin
   *  slackbot service
   *    chatterbox handles user reporting with screenshot of image
   *    help -> how to navigate, troubleshoot
   * 
   * jonjones service:
   *  blocks ip service
   *  blocks user
   *  serves as a protector of our app 
   * 
   * cache service:
   * 
   * picafe service:
   *  websocketing
   *  updating room messages <// look into firebase
   * 
   * 
   *  AZILE SERVICE:
   *   * strictly email
   *   * informs when people like you
   *   * informs when you get new message <) optimal
   * ---
   * CUPID
   * When I go to the search bar and press enter
   * I want to be able to create a room
   *  params: (dto, crushEmail)
   *
   *   step 1. check if crush is User
   *      t-> existingRoom()
   *      f -> step 2. createRogueUser, azileService -> send email notify rogue user you a crush, notify creator when crush joins
   *    
   *  existingRoom() {
   *   T=> then update room guess status and inform frontend match, confetti | break out of function
   *  
   *  createRoom() {
   *   // make distinction in rogue rooms and real rooms
   * }   
   * } 
   * 
   *  leaveRoom()
   * 
   *  reportRoom()
   * 
   *  
   * 
   * 
   * 
   */
  createRoom(createRoomDto: CreateRoomDto): Promise<string>;

}


@Injectable()
export class CupidService {

  createRoom(createCupidDto: CreateCupidDto): Promise<string> {
    return `This action adds a new cupid`;
  }

  findAll() {
    return `This action returns all cupid`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cupid`;
  }

  update(id: number, updateCupidDto: UpdateCupidDto) {
    return `This action updates a #${id} cupid`;
  }

  remove(id: number) {
    return `This action removes a #${id} cupid`;
  }
}
