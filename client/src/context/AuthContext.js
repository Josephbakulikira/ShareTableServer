import React, {useState, useEffect, createContext} from 'react'
import axios from 'axios'
import myUrl from '../URL';

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(undefined);

    async function GetLoggedIn(){
        const loggedInResp = await axios.get(myUrl + "/api/users/loggedIn");
        setLoggedIn(loggedInResp.data);
    }

    useEffect(() => {
        GetLoggedIn();
    }, []);
  return (
    <AuthContext.Provider value={{loggedIn, GetLoggedIn}}>
        {
            props.children
        }
    </AuthContext.Provider>
  )
}

export default AuthContext;
export {AuthContextProvider};