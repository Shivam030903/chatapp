import conversationModel from "../models/conversation.model.js";
import messageModel from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;
    console.log(message,reciverId,senderId);
    

    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, reciverId] },
    });

    if(!conversation){
        conversation = await conversationModel.create({
            participants: [senderId,reciverID]
        })
    }
    const newMessage = new messageModel({
        senderId,
        reciverId,
        message
    })

    if(newMessage){
        conversation.messages.push(newMessage._id)
    }

    // Socket.io functionality

    // await conversation.save()
    // await newMessage.save()

    // this will run in parallely

    await Promise.all([conversation.save(),newMessage.save()])


    res.status(201).json(newMessage)
  } catch (error) {
    console.log("error ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getMessage = async(req,res)=>{
    try {
        const {id:userToChatId} = req.params
        const senderId = req.user._id

        const conversation = await conversationModel.findOne({
            participants:   { $all: [senderId,userToChatId]}
        }).populate("messages")

        if(!conversation) return res.status(200).json([])
        
        const messages= conversation.messages
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error" , error)
        res.status(500).json({message:"internal server error"})
    }
}