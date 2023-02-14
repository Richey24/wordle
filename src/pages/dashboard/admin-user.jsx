import { useState, useEffect } from "react"
import axios from "axios"
import url from "../../url"
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

  export function AdminUser() {
   
    const online = true;

   const [responseData, setUsers ] = useState("");
   const fetchUser = async () => {
      const token = localStorage.getItem("token");
      await axios.get(`${url}/api/user/all`, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
       .then( res => {

         let data = res.data
         console.log(data.users);
         setUsers(data.users)
  
       })
       .catch( err => {
        console.log(err.response)
       })
   }


   useEffect(() => {
      fetchUser()
   }, [])

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Name", "Status", "Tribe", "Country", "actions"].map((el) => (
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
                    const className = `py-3 px-5 ${
                      key === responseData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
  
                    return (
                      <tr key={data.username}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={ profileImage}  size="sm" />
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {data.username}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {data.email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                
                        <td className={className}>
                        <Chip
                            variant="gradient"
                            color={online ? "green" : "blue-gray"}
                            value="online"
                            className="py-0.5 px-2 text-[11px] font-medium"
                          />
                       
                        </td>
                        <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {data.tribe[0]}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            as="a"
                            href="#"
                            className="text-xs font-semibold text-blue-gray-600"
                          >
                            {data.country[0]}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            as="a"
                            href="#"
                            className="text-xs font-semibold text-blue-gray-600"
                          >
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

export default AdminUser;