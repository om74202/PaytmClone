import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/User"

export const Dashboard=()=>{
    return <div>
        <Appbar/>
        <div>
            <Balance value={10000}/>
        </div>
        <Users/>
    </div>
}