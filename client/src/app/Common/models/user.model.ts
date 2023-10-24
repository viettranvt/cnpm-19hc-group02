export class User {
  id?: number;
  fullName?: string;
  address?: string;
  phoneNumber?: string;
  identityId?: string;
  identityType?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;

  //function 
  toUserUpdate() {
    return {
      userId: this.id,
      fullName: this.fullName,
      address: this.address,
      phoneNumber: this.phoneNumber
    };
  }
}
