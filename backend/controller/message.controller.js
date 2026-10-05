import conversationModel from "../models/conversation.model.js";
import messageModel from "../models/message.model.js";
import { getReciverSocketId,io } from "../socket/socket.js";

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
            participants: [senderId,reciverId]
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
    // await conversation.save()
    // await newMessage.save()

    // this will run in parallely

    await Promise.all([conversation.save(),newMessage.save()])

    // Socket.io functionality
    const reciverSocketId = getReciverSocketId(reciverId)
    if(reciverSocketId){
      io.to(reciverSocketId).emit("newMessage",newMessage)
    }


    


    res.status(201).json(newMessage)
  } catch (error) {
    console.log("error ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    console.log("senderId:", senderId);
    console.log("userToChatId:", userToChatId);

    const allConversations = await conversationModel.find({});

    console.log(
      "ALL CONVERSATIONS:",
      JSON.stringify(allConversations, null, 2)
    );

    const conversation = await conversationModel.findOne({
      participants: { $all: [senderId, userToChatId] },
    });

    console.log("FOUND CONVERSATION:", conversation);

    if (!conversation) {
      return res.status(200).json([]);
    }

    await conversation.populate("messages");

    console.log("POPULATED MESSAGES:", conversation.messages);

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("GET MESSAGE ERROR:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// export const getMessage = async(req,res)=>{
//     try {
//         const {id:userToChatId} = req.params
//         const senderId = req.user._id

//         console.log("senderId:", senderId);
//         console.log("userToChatId:", userToChatId);

//         const conversation = await conversationModel.findOne({
//             participants:   { $all: [senderId,userToChatId]}
//         }).populate("messages")

//         if (!conversation) {
//       console.log("❌ Conversation not found");
//       return res.status(200).json([]);
//     }
        
//         const messages= conversation.messages
//         res.status(200).json(messages)
//     } catch (error) {
//         console.log("Error" , error)
//         res.status(500).json({message:"internal server error"})
//     }
// }