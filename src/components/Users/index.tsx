import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Users } from "../../types/types";
import MyButton from "../UI/button/MyButton";
import { CreateUser, UpdateUser } from "./modal/CreateUser";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface IUsersProps {
  users: Users[];
}

const Userss: React.FC<IUsersProps> = ({ users }) => {
  const [isCreateUser, setIsCreateUser] = useState<boolean>(false);
  const [isUpdateUser, setIsUpdateUser] = useState<boolean>(false);
  const [selectUser, setSelectUser] = useState<any>({});
  const deleteUser = (name: string) => {
    alert(`К сожалению Вы не можете удалить пользователя ${name}`);
  };

  const createUser = () => {
    setIsCreateUser(!isCreateUser);
  };

  const updateUser = (user: any) => {
    setSelectUser(user);
    setIsUpdateUser(!isUpdateUser);
  };

  return (
    <>
      {isCreateUser && <CreateUser closeModal={createUser} />}
      {isUpdateUser && <UpdateUser user={selectUser} />}
      <TableContainer component={Paper}>
        <div className="users">
          <MyButton onClick={createUser}>Добавить пользователя</MyButton>
        </div>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Role</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Active</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  <img
                    src={row.avatar}
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.role}</StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">
                  <div className="users-actions">
                    <MyButton onClick={() => deleteUser(row.name)}>
                      Удалить
                    </MyButton>

                    <MyButton onClick={() => updateUser(row)}>
                      Переименовать
                    </MyButton>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Userss;
