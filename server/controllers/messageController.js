const Message=require("../models/messageModel")


module.exports.addMessage=async(req,res,next)=>{
    try {
        const {from,to,message}=req.body;
        const data=await  Message.create({
            message:{text:message},
            users:[from,to],
            sender:from
        })
        if(data) return res.status(200).json({msg:"message sent succesfully"})
        else return res.status(400).json({msg:"unable to send a message"})
    }catch(err) {
        console.log(err)
        next(err)
    }
}


module.exports.getAllMessages=async(req,res,next)=>{
    try{
       const {from,to}=req.body; 
    const messages=await Message.find({users:{$all:[from,to]}}).sort({updatedAt:1})

    const ProjectedMessages=messages.map(message=>{
            return {
                fromSelf:message.sender.toString()===from,
                message:message.message.text,
            }
    })

    return res.json(ProjectedMessages);

    }catch(err) {
        next(err);
    }
}


