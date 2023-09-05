export interface AbstractUsers {
  createUser(data: any): Promise<any>;
  getUser(id: string): Promise<any>;
  getAllUsers(): Promise<any[]>;
  deleteUser(id: string): Promise<void>;
  updateUser(id: string, data: any): Promise<any>;
}
