import { useState, useEffect } from "react"
import axios from "axios"
import url from "../../url"
import Moment from 'react-moment';
import profileImage from '../../assets/img/profile.png'
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Tooltip,
    Progress,
  } from "@material-tailwind/react";

  export function Activity() {
   
    const online = true;

   const [responseData, setActivity ] = useState("");
   const fetchActivity = async () => {
      const token = localStorage.getItem("token");
      await axios.get(`${url}/api/activities/crossword`, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
       .then( res => {

         let data = res.data
         console.log(data)
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
        <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["user", "game", "score", "date", "time remain", "status"].map((el) => (
                    <th
                      key={el}x
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {responseData && responseData.map(
                  (data, key) => {
                    return (
                      <tr key={data.user_id.username} key={key}>
                        <td className="border-b border-blue-gray-50 py-3 px-5">
                          <div className="flex items-center gap-4">
                            <Avatar src={ profileImage}  size="sm" />
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {data.user_id.username}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {data.user_id.email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                
                        <td className="border-b border-blue-gray-50 py-3 px-5">
                       
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            {data.game}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-5">
                           <Chip
                            variant="gradient"
                            color={online ? "green" : "blue-gray"}
                            value={data.score}
                            className="py-0.5 px-2 text-[11px] font-medium"
                          />
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-5">
                          <Typography
                            as="a"
                            href="#"
                            className="text-xs font-semibold text-blue-gray-600"
                          >
                          <Moment fromNow>{data.date}</Moment>
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-5">
                          <Typography
                            as="a"
                            href="#"
                            className="text-xs font-semibold text-blue-gray-600"
                          >
                          {data.time} Secounds
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-5">
                          <Typography
                            as="a"
                            href="#"
                            className="text-xs font-semibold text-blue-gray-600"
                          >
                           {data.status ? <span>Success</span> : <span>Failed</span>}
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    )
}

export default Activity;