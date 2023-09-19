import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState ,useEffect} from "react";
import { useContext } from "react";
 const ChatContext = createContext();


 const ChatProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')));
    const [selectedChat, setSelectedChat] = useState(); 
    const [chats, setChats] = useState([]);

const navigate=useNavigate();
    useEffect(() => {

        const userInfo=JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo);
        if(!userInfo || userInfo===null || user===undefined){
navigate('/');

        }
    }, [navigate]);

    return(
        <ChatContext.Provider value={{ user, setUser ,selectedChat,setSelectedChat, chats,setChats}}>
        {children}
      </ChatContext.Provider>
    )
 };
export const ChatState=()=>{

    return useContext(ChatContext);
}


 export default ChatProvider;