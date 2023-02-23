import { useState, useEffect } from "react";

import axios from "axios"
import url from "../../url"

import {
    Card,
    CardBody,
    Typography,
    Chip,
  } from "@material-tailwind/react";

export function WeeklyWinner() {

    const [winners, setWinners] = useState();

    const fetchWinners = async () => {
        const token = sessionStorage.getItem("token");
        await axios.get(`${url}/api/weekly-winners`, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
        .then(res => {
            console.log( res.data ) 
            setWinners(res.data)
        })
    }

    useEffect(() => {
       fetchWinners()
    }, [winners]);

    return (
        <div>
               <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Name", "Status", "Tribe", "Country", "Change Role", "Delete"].map((el) => (
                    <th
                      key={el} x
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
                {winners && winners.map(
                  (data, key) => {
                    const className = `py-3 px-5 ${key === winners.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                      }`;

                    return (
                      <tr key={data.username}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
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
                            color={data.onlineStatus ? "green" : "blue-gray"}
                            value={data.onlineStatus ? "Online" : "Offline"}
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
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
        </div>
    )
}