import React, {FC, useContext} from 'react';
import {NavDropdown} from "react-bootstrap";
import {AuthContext} from "../main";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

export interface UserBarProps {
    isForExpand: boolean;
}

const UserBar = ({isForExpand}: UserBarProps) => {
    const {auth} = useContext(AuthContext);
    const switchRole = (roleName: string) => {
        switch (roleName) {
            case 'author':
                return 'Автор';
            case 'moderator':
                return 'Модератор';
            case 'admin':
                return 'Админ';
            default:
                return 'Пользователь';
        }
    }

    return (
        <>
            <NavDropdown className={'text-light'} title={<span style={{fontSize: isForExpand ? 25 : 18}} className="text-light"><img className={'border-warning'} style={{height: 40, width: 40, borderRadius: 20}} src="https://klike.net/uploads/posts/2022-10/1664702645_l-34.jpg"/>  {auth.user.nickName}</span>} id="nav-dropdown" menuVariant={"dark"}>
                <NavDropdown.Header>{`Роль: ${switchRole(auth.user.role)}`}<br/>{`ELO: ${auth.user.rating}`}</NavDropdown.Header>
                <NavDropdown.Item href={`/user/${auth.user.id}`}>Профиль</NavDropdown.Item>
                <NavDropdown.Item href={`/user/${auth.user.id}/settings`}>Настройки</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => auth.logout()}>Выход</NavDropdown.Item>
            </NavDropdown>
        </>
    );
};

export default observer(UserBar);