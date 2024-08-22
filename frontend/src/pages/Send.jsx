export const Send=()=>{
    return <div className="flex justify-center bg-gray-100 h-screen">
        <div className="flex justify-center h-full flex-col">
            <div className="border h-min bg-white shadow-lg rounded-lg max-w-md p-4 space-y-8"> 
            <div className="flex flex-col space-y-1 p-6">
                <h2 className="font-bold text-3xl">Send Money</h2>
            </div>
            <div className="p-6">
                <div className="flex items-center space-x-4">
                <div className="bg-green-500 h-12 w-12 flex justify-center items-center rounded-full">
                    <span className="text-white text-2xl">A</span>
                </div>
                <h3 className="font-semibold">Name of receiver</h3>
                </div>
                <div>
                    <div>
                        <label className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-none">Amount in Rs </label>
                    </div>
                    <input type="number" id="amount" onChange={(e)=>{

                    }} className="flex h-10 w-full rounded-md border py-3 px-2 text-sm" />
                </div>
            </div>
            </div>
            
            
        </div>
    </div>
}