import { useState, useEffect } from "react"
import axios from "axios"
import url from "../../url"
import PageHader from './components/PageHeader';

function AdminGameActivity() {
   
   const [responseData, setActivity ] = useState("");

   const fetchActivity = async () => {
      const token = localStorage.getItem("token");
      await axios.get(`${url}/api/activities/crossword`, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
       .then( res => {

         let data = res.data
         console.log(data.activities);
         setActivity(data.activities)
  
       })
       .catch( err => {
        console.log(err.response)
       })
   }

//    const activityList = datas.map((item) => (
//       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                 Apple MacBook Pro 17"
//             </th>
//       </tr>
//   ));

   useEffect(() => {
      fetchActivity()
   }, [])

    return (
        <div className="p-4 dark:border-gray-700 mt-14">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <PageHader title="Activities" />
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                              User
                            </th>
                            <th scope="col" className="px-6 py-3">
                               Game
                            </th>
                            <th scope="col" className="px-6 py-3">
                               Score
                            </th>
                            <th scope="col" className="px-6 py-3">
                               Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time Remain
                            </th>
                            <th scope="col" className="px-6 py-3">
                               Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                    {responseData && responseData.map((user, index) => {
                        return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                             <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <img class="w-10 h-10 rounded-full"  src="/img/profile.png" alt="profile picture" />
                                <div class="pl-3">
                                    <div class="text-base font-semibold">{user.user_id.username}</div>
                                    <div class="font-normal text-gray-500">{user.user_id.email}</div>
                                </div>  
                            </th>
                             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                               {user.game}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                               {user.score}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                               {user.date}
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user.time} <i>Secounds</i>
                            </th>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user.status ? <span>Success</span> : <span>Failed</span>}
                            </th>
                        </tr>
                    })}        
                  
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminGameActivity;