export class employee
{
    public id:number;
    public name:string;
    public emailId:string;
    public phoneNumber:number;
    public DOB:number;
    public address:string;
    public imagePath:string
    constructor(id:number, name:string,emailId:string,phoneNumber:number,DOB:number,address:string,imagePath:string)
    {
    this.id=id;
    this.name=name;
    this.emailId=emailId;
    this.phoneNumber=phoneNumber;
    this.DOB=DOB;
    this.address=address;
    this.imagePath=imagePath
    }
}


