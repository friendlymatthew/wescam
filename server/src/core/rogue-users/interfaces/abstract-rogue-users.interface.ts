export interface AbstractRogueUsers {
  createRogueUser(data: any): Promise<any>;
  isRogueUser(email: string): Promise<any>;
  removeRogueUser(email: string): Promise<any>;
}
