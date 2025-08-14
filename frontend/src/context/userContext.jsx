import {createContext,userContext,useState,useEffect} from "react";
import axios from "axios"
import {server} from "../main"

const UserContext = createContext();

export const UserProvider = ({children}) =>{

    const [btnloading,setBtnloading] = useState(false);
     
    const registeruser = async (name,email,navigate) =>{
        setBtnloading(true);
        try{
             const {data} = await axios.post(`${server}/api/user/register`, {name,email});
             toast.success(data.message);
             localStorage.setItem("verifyToken",data.verifyToken);
             navigate("/verify");
             setBtnloading(false);

        } catch(error){
            toast.error(error.response.data.message);
            setBtnloading(false);
        }
    }
    
    const [user,setUser] = useState([]);
    const [isAuth,setIsAuth] = useState(false);

    const verifyuser = async(otp,navigate,fetchchats) =>{

        const verifyToken = localStorage.getItem("verifyToken");
        setBtnloading(true);
        if(!verifyToken){
            return toast.error("Please give token");
        }

        try{
           const {data} = await axios.get(`${server}/api/user/verify`,{
            otp,verifyToken
           })
           
           toast.success(data.message)
           localStorage.clear();
           localStorage.setItem("verifyToken",data.token)
           navigate("/")
           setIsAuth(true)
           setUser(data.user)
           fetchchats()

        }catch(error){
            toast.error(error.response.data.message);
            setBtnloading(false);
        }
    }

     const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setIsAuth(true);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
      setLoading(false);
    }
  }

  const logoutHandler = (navigate) => {
    localStorage.clear();

    toast.success("logged out");
    setIsAuth(false);
    setUser([]);
    navigate("/login");
  };

  useEffect(()=>{
    fetchUser();
  },[]);

  return (
    <UserContext.Provider value={{
        registeruser,
        btnloading,
        isAuth,
        setIsAuth,
        user,
        verifyuser,
        loading,
        logoutHandler,
    }}>
     {children}
     <Toaster />
    </UserContext.Provider>
  )
}