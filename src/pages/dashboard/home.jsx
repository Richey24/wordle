import React from "react";
import axios from "axios"
import url from "../../url"
import {
  BanknotesIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "../../widgets/cards";
import { DashboardNavbar } from "../../widgets/layout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"


// import {
//   statisticsCardsData,
//   statisticsChartsData,
//   projectsTableData,
//   ordersOverviewData,
// } from "@/data";

export function Home() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [country, setCountry] = useState(new Set())
  const [leaders, setLeaders] = useState([])
  const [active, setActive] = useState("word")
  const [title, setTitle] = useState("Word Quest")
  const [report, setReport] = useState([]);

  const fetchUser = async () => {
    const token = sessionStorage.getItem("token");
    await axios.get(`${url}/api/user/all`, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
      .then(res => {
        let data = res.data
        setUsers(data.users)
        let coun = data.users.map((co) => co.country[0]).filter((co) => co !== undefined)
        const set = new Set(coun)
        setCountry(set)
        const arr = data.users.sort((a, b) => b.dailyWQS - a.dailyWQS)
        setLeaders(arr)
      })
      .catch(err => {
        console.log(err.response)
        navigate("/admin/login")
      })
  }

  const fetchReport = async () => {
    const token = sessionStorage.getItem("token");
    await axios.get(`${url}/api/admin`, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
      .then(res => {
        console.log(res)
        setReport(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchUser()
    fetchReport()
  }, [])

  const getLeaders = async (val) => {
    switch (val) {
      case "word":
        const wordArr = users.sort((a, b) => b.dailyWQS - a.dailyWQS)
        setLeaders(wordArr)
        setActive("word")
        setTitle("Word Quest")
        break;
      case "bible":
        const bibleArr = users.sort((a, b) => b.dailyBQS - a.dailyBQS)
        setLeaders(bibleArr)
        setActive("bible")
        setTitle("Bible Quest")
        break;
      case "hang":
        const hangArr = users.sort((a, b) => b.dailyHS - a.dailyHS)
        setLeaders(hangArr)
        setActive("hang")
        setTitle("Hangman")
        break;
      case "trivial":
        const token = sessionStorage.getItem("token");
        const res = await axios.get(`${url}/score/get/all`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          validateStatus: () => true
        })
        const rep = await res.data
        const arr = rep.sort((a, b) => b.score - a.score)
        setLeaders(arr)
        setActive("trivial")
        setTitle("Bible Trivial")
        break;
      case "cross":
        const crossRes = await axios.get(`${url}/api/leaderboard`)
        const crossRep = await crossRes.data
        const newArr = crossRep.leadboard.map((lead) => {
          const user = lead.user
          delete lead.user
          const newObj = { ...lead, ...user }
          return newObj
        })
        const crossArr = newArr.sort((a, b) => b.score - a.score)
        setLeaders(crossArr)
        setActive("cross")
        setTitle("Crossword")
        break;

      default:
        break;
    }
  }

  return (
    <div>
      <div className="mt-12">
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          <StatisticsCard
            value={report.onlineUsers}
            color="pink"
            title="Online Users"
            icon={React.createElement(UserIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className="text-green-500">+55%</strong>
                &nbsp;than last week
              </Typography>
            }
          />
          <StatisticsCard
            value={report.userCount}
            color="blue"
            title="Total User"
            icon={React.createElement(BanknotesIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className="text-green-500">+55%</strong>
                &nbsp;than last week
              </Typography>
            }
          />
          <StatisticsCard
            value={report.countryCount}
            color="green"
            title="Country"
            icon={React.createElement(BanknotesIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className="text-green-500">+55%</strong>
                &nbsp;than last week
              </Typography>
            }
          />
          <StatisticsCard
            value="0"
            color="orange"
            title="Incentives Available"
            icon={React.createElement(BanknotesIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className="text-green-500">+55%</strong>
                &nbsp;than last week
              </Typography>
            }
          />
        </div>
        <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">

        </div>
        <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="overflow-hidden xl:col-span-2">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 flex items-center justify-between p-6"
            >
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                  {title} LeaderBoard top 10
                </Typography>
              </div>
              <Menu placement="left-start">
                <MenuHandler>
                  <IconButton size="sm" variant="text" color="blue-gray">
                    <EllipsisVerticalIcon
                      strokeWidth={3}
                      fill="currenColor"
                      className="h-6 w-6"
                    />
                  </IconButton>
                </MenuHandler>
                <MenuList>
                  <MenuItem onClick={() => getLeaders("word")} style={active === "word" ? { backgroundColor: "grey", color: "white" } : {}}>Word Quest LeaderBoard</MenuItem>
                  <MenuItem onClick={() => getLeaders("bible")} style={active === "bible" ? { backgroundColor: "grey", color: "white" } : {}}>Bible Quest LeaderBoard</MenuItem>
                  <MenuItem onClick={() => getLeaders("hang")} style={active === "hang" ? { backgroundColor: "grey", color: "white" } : {}}>Hangman LeaderBoard</MenuItem>
                  <MenuItem onClick={() => getLeaders("trivial")} style={active === "trivial" ? { backgroundColor: "grey", color: "white" } : {}}>Bible Trivial LeaderBoard</MenuItem>
                  <MenuItem onClick={() => getLeaders("cross")} style={active === "cross" ? { backgroundColor: "grey", color: "white" } : {}}>Crossword LeaderBoard</MenuItem>
                </MenuList>
              </Menu>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Username", "Tribe", "School", "Country", "Score"].map(
                      (el) => (
                        <th
                          key={el}
                          className="border-b border-blue-gray-50 py-3 px-6 text-left"
                        >
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium uppercase text-blue-gray-400"
                          >
                            {el}
                          </Typography>
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {
                    leaders.slice(0, 10).map((leader, i) => (
                      <tr key={i}>
                        <td className="py-3 px-3 border-b border-blue-gray-50">
                          <div className="flex items-center gap-4">
                            <div style={active === "trivial" ? { textTransform: "capitalize" } : {}}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {active !== "trivial" && leader?.username}
                                {active === "trivial" && leader?.playerName}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {leader?.email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 border-b border-blue-gray-50">
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {active !== "trivial" && leader?.tribe[0]}
                            {active === "trivial" && leader?.tribe}
                          </Typography>
                        </td>
                        <td className="py-3 px-4 border-b border-blue-gray-50">
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {leader?.church}
                          </Typography>
                        </td>
                        <td className="py-3 px-4 border-b border-blue-gray-50">
                          {active !== "trivial" && <img style={{ width: "30px", height: "30px" }} src={leader?.country[1]} alt="" />}
                        </td>
                        <td className="py-3 px-4 border-b border-blue-gray-50">
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {active === "word" && leader?.dailyWQS?.toFixed(2)}
                            {active === "bible" && leader?.dailyBQS?.toFixed(2)}
                            {active === "hang" && leader?.dailyHS?.toFixed(2)}
                            {active === "trivial" && leader?.score?.toFixed(2)}
                            {active === "cross" && leader?.score?.toFixed(2)}
                          </Typography>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
                <tbody>
                  {/* {projectsTableData.map(
                  ({ img, name, members, budget, completion }, key) => {
                    const className = `py-3 px-5 ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          {members.map(({ img, name }, key) => (
                            <Tooltip key={name} content={name}>
                              <Avatar
                                src={img}
                                alt={name}
                                size="xs"
                                variant="circular"
                                className={`cursor-pointer border-2 border-white ${
                                  key === 0 ? "" : "-ml-2.5"
                                }`}
                              />
                            </Tooltip>
                          ))}
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {budget}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {completion}%
                            </Typography>
                            <Progress
                              value={completion}
                              variant="gradient"
                              color={completion === 100 ? "green" : "blue"}
                              className="h-1"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )} */}
                </tbody>
              </table>
            </CardBody>
          </Card>
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 p-6"
            >
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Billing Overview
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <ArrowUpIcon
                  strokeWidth={3}
                  className="h-3.5 w-3.5 text-green-500"
                />
                <strong>24%</strong> this month
              </Typography>
            </CardHeader>
            <CardBody className="pt-0">
              {/* {ordersOverviewData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                      key === ordersOverviewData.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `!w-5 !h-5 ${color}`,
                    })}
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )} */}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>

  );
}

export default Home;
