// NextJS API
import { NextApiRequest, NextApiResponse } from "next";

// Function to create and recieve API Data
function UsersData(request: NextApiRequest, response: NextApiResponse) {
  const users = [
    { id: 1, name: "Lucas" },
    { id: 2, name: "Lucas2" },
    { id: 3, name: "Lucas3" },
  ];

  return response.json(users);
}

export default UsersData;
