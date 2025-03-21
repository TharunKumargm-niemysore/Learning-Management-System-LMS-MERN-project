import { Webhook } from "svix";
import User from "../models/User.js"


//API controller Function to manage Clerk user with database

export const clerkWebhooks =async(req,res)=>{

    try{
        const whook= new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
        })

        const {data, key} = req.body

        //request the user information from the clerk ,and store it in database

        switch (key){
            case 'user.created':{
                const userData={
                    _id:data.id,
                    email:data.email_adresses[0].email_adress,
                    name:data.first_name +" "+data.last_name,
                    imageUrl:data.image_url,
                }
                await User.create(userData)
                res.json({})
                break;
            }

            case 'user.updated':{
                const userData={
                    email:data.email_adress[0].email_adress,
                    name:data.first_name +" "+data.last_name,
                    imageUrl:data.image_url,
                }

                await User.findByIdAndUpdate(data.id,userData)
                res.json({})
                break;
            }

            case 'user.deleted':{
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }

            default:
                break;
        }

    } catch (error){
        res.json({success:false,message:error.message})

    }
    

    

}
