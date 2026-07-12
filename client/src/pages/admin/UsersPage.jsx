import { useState, useEffect } from "react";
import axios from "axios";

import api from "../../utils/api";

import TableUsers from "../../components/admin/get/TableUsers";

const LINK = "http://localhost:8000/user";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
  api.get(LINK + "/users")
    .then((res) => setUsers(res.data))
    .catch((err) => console.log(err));
}, [deleted]);

  return (
    <div>
      <TableUsers users={users} setDeleted={setDeleted} />
    </div>
  )
}

export default UsersPage