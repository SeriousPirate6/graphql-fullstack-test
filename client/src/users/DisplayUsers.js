import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      username
      age
      nationality
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      username
      age
      nationality
    }
  }
`;

function DisplayUsers() {
  const {
    data: dataUsers,
    loading: loadingUsers,
    error: errorUsers,
    refetch,
  } = useQuery(QUERY_ALL_USERS);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  if (loadingUsers) {
    return (
      <div className="text-center mt-4">
        <div className={"spinner-border"} role="status"></div>
      </div>
    );
  }

  if (dataUsers) {
    console.log(dataUsers);
  }

  if (errorUsers) {
    console.log(errorUsers);
  }

  return (
    <div className={"container"}>
      <div>
        <h1 className={"text-center mt-4"}>List of Users</h1>
      </div>
      <div className={"input-group mb-3 mt-4"}>
        <input
          type="text"
          className={"form-control"}
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        ></input>
        <input
          type="text"
          className={"form-control"}
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>
      </div>
      <div className={"input-group mb-3 mt-4"}>
        <input
          type="number"
          className={"form-control"}
          placeholder="Age..."
          onChange={(event) => {
            setAge(Number(event.target.value));
          }}
        ></input>
        <input
          type="text"
          className={"form-control"}
          placeholder="Nationality..."
          onChange={(event) => {
            setNationality(event.target.value.toUpperCase());
          }}
        ></input>
      </div>
      <div className={"text-center"}>
        <button
          className={"btn btn-outline-secondary w-100"}
          type="button"
          onClick={() => {
            createUser({
              variables: { input: { name, username, age, nationality } },
            });
            // refetching the data every time a user is added to the list
            refetch();
          }}
        >
          Create User
        </button>
      </div>
      <div className={"py-4"}>
        <table className={"table border shadow"}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Age</th>
              <th scope="col">Nationality</th>
            </tr>
          </thead>
          <tbody>
            {dataUsers &&
              dataUsers.users.map((user, index) => {
                return (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.age}</td>
                    {/* since all states are written in upper case strings, we change them to lowercase, except for the first char*/}
                    <td>
                      {user.nationality.charAt(0) +
                        user.nationality.slice(1).toLowerCase()}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DisplayUsers;
