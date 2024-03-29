import { useState, useEffect } from "react"
import axios from "axios"
import url from "../../url"
import del from "../../img/bigdel.svg"
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
  Input,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { DashboardNavbar } from "../../widgets/layout";

export function AdminUser() {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [fil, setFil] = useState([])
  const navigate = useNavigate()

  const fetchUser = async () => {
    const token = sessionStorage.getItem("token");
    await axios.get(`${url}/api/user/all`, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
      .then(res => {
        let data = res.data
        setUsers(data.users)
        setFil(data.users)

      })
      .catch(err => {
        console.log(err.response)
        navigate("/admin/login")
      })
  }

  const getUser = async () => {
    const token = sessionStorage.getItem("token");
    const id = sessionStorage.getItem("id");
    const res = await axios.get(`${url}/user/get/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      validateStatus: () => true
    })
    const rep = await res.data
    if (res.status !== 200) {
      navigate("/admin/login")
    }
    setUser(rep)
  }

  useEffect(() => {
    getUser()
    fetchUser()
  }, [])

  const filterUser = (e) => {
    const word = e.target.value.toLowerCase()
    const arr = fil.filter((fi) => `${fi.username.toLowerCase()} ${fi.email}`.includes(word))
    console.log(arr)
    setUsers(arr)
  }

  const changeRole = async (e, data) => {
    const token = sessionStorage.getItem("token");
    const role = e.target.value
    if (data.superAdmin && !user.superAdmin) {
      return
    }
    switch (role) {
      case "user":
        await axios.put(`${url}/user/update/${data._id}`, { superAdmin: false, admin: false }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        break;
      case "admin":
        if (!data.paid) {
          return
        }
        await axios.put(`${url}/user/update/${data._id}`, { superAdmin: false, admin: true }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        break;
      case "super admin":
        if (!data.paid) {
          return
        }
        await axios.put(`${url}/user/update/${data._id}`, { superAdmin: true, admin: true }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        break;

      default:
        break;
    }
  }

  const deleteUser = async (id) => {
    const token = sessionStorage.getItem("token");
    if (!user.superAdmin) {
      return
    }
    await axios.delete(`${url}/user/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    fetchUser()
  }

  return (
    <div>
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input onChange={filterUser} label="Type here" />
          </div>
        </div>
      </div>
      <div className="mt-3 mb-8 flex flex-col gap-12">
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
                {users && users.map(
                  (data, key) => {
                    const className = `py-3 px-5 ${key === users.length - 1
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
                        <td className={className}>
                          <Typography
                            as="a"
                            href="#"
                            className="text-xs font-semibold text-blue-gray-600"
                          >
                            <select onChange={(e) => changeRole(e, data)} style={{ outline: "none", cursor: "pointer" }} name="role" id="role">
                              <option value="user">User</option>
                              <option selected={!data?.superAdmin && data?.admin && true} value="admin">Admin</option>
                              {user?.superAdmin && <option selected={data?.superAdmin && true} value="super admin">Super admin</option>}
                            </select>
                          </Typography>
                        </td>
                        {user.superAdmin && <td className={className}>
                          <img onClick={() => deleteUser(data?._id)} style={{ cursor: "pointer" }} src={del} alt="" />
                        </td>}
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

export default AdminUser;