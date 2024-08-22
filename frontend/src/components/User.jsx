import axios from "axios";
import { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const Users=()=>{
    const [user,setUser]=useState([]);
    const [filter,setFilter]=useState("");
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
        .then(response=>{
            setUser(response.data.user);
        })
    },[filter])
    return <div>
        <div className="font-bold text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e)=>{
                setFilter(e.target.value);
            }} placeholder="Search users.." type="text" className="w-full border rounded px-2 py-1 border-slate-200"></input>
        </div>
        <div>
            {user.map(user=> <User user={user}/>)}
        </div>
    </div>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}