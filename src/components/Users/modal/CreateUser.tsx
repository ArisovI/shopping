import React, { ReactNode, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { createUser, updateUser } from "../../../store/async/async";
import MyButton from "../../UI/button/MyButton";
import MyInput from "../../UI/input/MyInput";

interface ICreateUserProps {
  closeModal: (event: any) => void;
}
interface IUpdateUser {
  user:any
}

export const CreateUser: React.FC<ICreateUserProps> = ({ closeModal }) => {
  const dispatch = useAppDispatch();
  const [img, setImg] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const createNewUser = () => {
    if (name.length > 0 && email.includes("@") && password.length > 6) {
      dispatch(createUser({ name, img, email, password }));
      alert("Created!");
    }
    if (!email.includes("@")) {
      alert("Email должен включать знак @");
    }
    if (password.length < 5) {
      alert("Длина пароля должна быть больше 6 букв");
    }
  };
  return (
    <div className="createUser">
      <div className="createUser-inner">
        <div className="createUser-inner__title">
          <h2>Создание нового пользователя</h2>
          <span onClick={closeModal}>Back</span>
        </div>
        <div className="userForm">
          <MyInput
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <MyInput
            type="text"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <MyInput
            type="text"
            placeholder="Пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <div className="avatarInput">
            {img.length > 5 ? <img src={img} alt="img" /> : ""}
            <MyInput
              type="search"
              placeholder="Ссылка на фото"
              value={img}
              onChange={(event) => setImg(event.target.value)}
            />
          </div>
          <MyButton onClick={createNewUser}>Создать</MyButton>
        </div>
      </div>
    </div>
  );
};

export const UpdateUser: React.FC<IUpdateUser> = ({user}) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const { users } = useAppSelector((state) => state.users);
  console.log(user)

  const updateNewUser = () => {
    if (email.includes("@") && name.length > 3) {
      dispatch(updateUser({ email, name }));
    }
    if (!email.includes("@")) {
      alert("Email должен включать знак @");
    }
    if (name.length < 3) {
      alert("Длина имени должна быть больше 3 букв");
    }
    console.log(users);
  };

  return (
    <div className="updateUser">
      <div className="updateUser-inner">
        <div className="updateUser-inner__title">
          <h2>Обновление пользователя</h2>
          <span>Back</span>
        </div>
        <div className="updateUser-inner__content">
          <form>
            <MyInput type="text" placeholder="Email" />
            <MyInput type="text" placeholder="Имя" />
          </form>
          <MyButton onClick={updateNewUser}>Обновить</MyButton>
        </div>
      </div>
    </div>
  );
};
