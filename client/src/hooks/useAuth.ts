import { useQuery } from "@tanstack/react-query"
import axios from "axios"


export interface UserProp{
    fullname: string,
    email: string,
    password:string
}


const useAuth = () => {

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const { data: authUser, isLoading } = useQuery<UserProp>({
        queryKey: ["authUser"],
        queryFn: async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/user/me`, { withCredentials: true });
                return res.data.user;
            } catch (e: any) {
                console.error(e.message);
                return null
            }
        },
        retry: false
    });
    return (
        {authUser,isLoading}
    )
}

export default useAuth;