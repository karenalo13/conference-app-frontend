import { useCallback } from "react"
import { emailKey } from "apollo/cacheKeyFunctions"
import { useApolloLocalStorage } from "./apolloLocalStorage"

export const  useEmail =()=>{

    const [emailStoraged,setEmailStorage]=useApolloLocalStorage(emailKey)
    const email=emailStoraged.email
    const  setEmail= useCallback((emailValue) =>
    setEmailStorage({ email: emailValue }), [setEmailStorage])

     return [email,setEmail]
}


//  const useEmail=useCallback(value =>{
//     useEmailStorage({email:value})
// },[useEmailStorage])
