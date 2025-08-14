import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";
import toast from "react-hot-toast";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [newRequestLoading, setNewRequestLoading] = useState(false);

  async function fetchResponse() {
    if (prompt === "") return alert("Write prompt");
    setNewRequestLoading(true);
    setPrompt("");
    try {
      const response = await axios.post(`${server}/api/chat/${selected}`, {
      prompt: prompt        
    });
      const message = {
        question: prompt,
        answer: response.data.answer
      };

    setMessages(prev => [...prev, message]);
    setPrompt("");
      
    }
      catch(err){
        console.log(err)
      }
    }

    return (
    <ChatContext.Provider
      value={{
        fetchResponse,
        messages,
        prompt,
        setPrompt,
        newRequestLoading,
        chats,
        createChat,
        createLod,
        selected,
        setSelected,
        loading,
        setLoading,
        deleteChat,
        fetchChats,
      }}
    >
      {children}
    </ChatContext.Provider>
    )
}