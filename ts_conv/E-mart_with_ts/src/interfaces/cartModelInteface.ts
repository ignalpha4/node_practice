
export interface ICartModel{
    profileId:String,
    items:IItems[]
}


export interface IItems{
    productId:string,
    quantity:number,
    productName:string
}