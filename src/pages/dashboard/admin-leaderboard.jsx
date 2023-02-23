import { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  Button,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import Moment from 'react-moment';
import axios from "axios"
import url from "../../url"
import {
    ChevronRightIcon,
  } from "@heroicons/react/24/solid";

import medal1 from '../../assets/medals/medal-1.png'
import medal2 from '../../assets/medals/medal-2.png'
import medal3 from '../../assets/medals/medal-3.png'


export function AdminLeaderboard() {

    const [leaderboard, setLeaderboard ] = useState([]);

    const fetchLeaderboard = async () => {
     
        const token = sessionStorage.getItem("token");
        await axios.get(`${url}/api/leaderboard`, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
        .then( res => {
            console.log(res.data.leadboard)
            setLeaderboard(res.data.leadboard)
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    useEffect(() => {
        fetchLeaderboard()
    }, [] )

    return (
        <div>
              <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
                <div className="capitalize">
                </div>
                <div className="flex items-center">
                    <div className="mr-auto md:mr-4 md:w-56">
                        </div>
                        <Button
                            variant="filled"
                            color="blue"
                            className="hidden items-center gap-1 px-4 xl:flex">
                            Weekly Winners
                            <ChevronRightIcon className="h-5 w-5" />
                        </Button>
                    
                    </div>
               </div>
             <div className="mt-12 mb-8 flex flex-col gap-12">
                <Card>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                    <thead>
                        <tr>
                        {["", "User Name", "Game", "Score", "Level", "Date"].map((el) => (
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
                            {leaderboard && leaderboard.map(
                            (data, key) => {
                                const className = `py-3 px-5 ${key === leaderboard.length - 1
                                ? ""
                                : "border-b border-blue-gray-50"
                                }`;
                                return (
                                <tr key={data.user.username}>
                                    <td className={className}>
                                        <div className="flex items-center gap-4">
                                            {key == 0 && <Avatar src={medal1} alt={medal1} size="sm" /> }
                                            {key == 1 && <Avatar src={medal2} alt={medal2} size="sm" /> }
                                            {key == 2 && <Avatar src={medal3} alt={medal3} size="sm" /> }
                                        </div>
                                    </td>
                                    <td className={className}>
                                    <div className="flex items-center gap-4">
                                        <div>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-semibold">
                                            {data.user.username}
                                        </Typography>
                                        <Typography className="text-xs font-normal text-blue-gray-500">
                                            {data.user.email}
                                        </Typography>
                                        </div>
                                    </div>
                                    </td>
                                    <td className={className}>
                                         <div className="flex items-center gap-4">
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {data.game}
                                            </Typography>
                                        </div>
                                    </td>

                                    <td className={className}>
                                    <Typography className="text-xs font-semibold text-blue-green-600">
                                        {data.score}
                                    </Typography>
                                    </td>

                                    <td className={className}>
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {data.game_level}
                                    </Typography>
                                    </td>

                                    <td className={className}>
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                       <Moment>{data.created_at}</Moment>
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