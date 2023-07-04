import React from "react";

export default function buildUserInfo(user) {

    const parseUserStatus = (status) => {
        switch (status) {
            case "PRACTICE": {
                return "На практике";
            }
            case "GUARANTEE": {
                return "Оформил гарантийное письмо";
            }
            case "CONTRACT": {
                return "Подписан контракт";
            }
            case "DEFAULT": {
                return "Простой пользователь";
            }
            default: {
                return "Простой пользователь";
            }
        }
    }

    return (
        <div className="expended_padding_block">
            <div className="expanded_info_div"><b>ФИО:</b> {user.fullname}</div>
            <div className="expanded_info_div"><b>Телефон:</b> {user.phoneNumber}</div>
            <div className="expanded_info_div"><b>Телеграм:</b> {user.telegram}</div>
            <div className="expanded_info_div"><b>Инстаграм:</b> {user.instagram}</div>
            <div className="expanded_info_div"><b>Статус:</b> {parseUserStatus(user.status)}</div>
            <div className="expanded_info_div"><b>Дата рождения:</b> {user.birthDate}</div>
            <div className="expanded_info_div"><b>Компания:</b> {user.firm}</div>
            <div className="expanded_info_div"><b>Университет:</b> {user.institution}</div>
            <div className="expanded_info_div"><b>Факультет:</b> {user.faculty}</div>
            <div className="expanded_info_div"><b>Специальность:</b> {user.speciality}</div>
            <div className="expanded_info_div"><b>Должности:</b> {user.positions}</div>
        </div>)
}