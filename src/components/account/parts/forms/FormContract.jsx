import React, {useEffect, useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


function FormContract({showProp, setShowPropFalse}) {

    const [showState, setShowState] = useState(showProp);


    const [formData, setFormData] = useState({});

    useEffect(() => {
        setShowState(showProp);
    }, [showProp]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        console.log(formData)
        setShowState(false)
        setShowPropFalse();
    };

    const handleClose = () => {
        setShowState(false);
        setShowPropFalse();
    };


    return (
        <Modal show={showState} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>"Введи"</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>ФИО полностью</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Иванова Татьяна Викторовна"
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Телефон (12 цифр)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="+375XXXXXXXXX"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="birth-date">
                        <Form.Label>Дата Рождения</Form.Label>
                        <Form.Control
                            type="date"
                            value="2001-01-01"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="passport-number">
                        <Form.Label>Серия и номер пасспорта</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="AB1234567"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="passport-start-date">
                        <Form.Label>Дата выдачи пасспорта</Form.Label>
                        <Form.Control
                            type="date"
                            value="2001-01-01"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="passport-end-date">
                        <Form.Label>Дата окончания действия пасспорта</Form.Label>
                        <Form.Control
                            type="date"
                            value="2001-01-01"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="passport-emitee">
                        <Form.Label>Кем выдан пасспорт</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Барановичским ГОВД Брестской обл."
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="passport-identification">
                        <Form.Label>Личный номер пасспорта</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="1234567A001PB1"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="address-residence">
                        <Form.Label>Адресс прописки</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="address-real">
                        <Form.Label>Адресс проживания</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="institution">
                        <Form.Label>Наименование учреждения образования</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="faculty">
                        <Form.Label>Наименование факультета</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="speciality">
                        <Form.Label>Наименование специальности</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="contract-duration">
                        <Form.Label>Сроки распределения в учереждении образования</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="contract-start-date">
                        <Form.Label>Дата начала отработки</Form.Label>
                        <Form.Control
                            type="date"
                            value="2001-01-01"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="contract-end-date">
                        <Form.Label>Дата окончания отработки</Form.Label>
                        <Form.Control
                            type="date"
                            value="2001-01-01"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="positions">
                        <Form.Label>Подходящие должности</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="source">
                        <Form.Label>Откуда узнали о нас (соц.сети/реклама/знакомые)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="конкретный человек, если знакомый"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="telegram">
                        <Form.Label>Имя пользователя в телеграме (ссылка)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="https://t.me/AlexHurevich"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="group_channels">
                        <Form.Label>Ваши студенческие группы, каналы, аккаунты в телеграме и др. соцсетях</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="https://t.me/AlexHurevich"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="supervisor">
                        <Form.Label>Куратор распределения (ФИО, должность, телефон городской, мобильный, telegram,
                            viber, полный адрес местонахождения, дни и время работы, e-mail, адрес для почтовой
                            корреспонденции)</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="grouphead">
                        <Form.Label>Староста (ФИО, номер телефона, telegram, vk, inst)</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="trustee-1">
                        <Form.Label>Доверенное лицо №1</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="trustee-2">
                        <Form.Label>Доверенное лицо №2</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="trustee-3">
                        <Form.Label>Доверенное лицо №3</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="employee-record">
                        <Form.Label>Трудовая книжка (есть/нужно завести)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="insurance-card">
                        <Form.Label>Карта соц. страх. (есть/нужно завести)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="army-card">
                        <Form.Label>Военный билет/приписное свидетельство</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="passport-photo">
                        <Form.Label>Фото паспорта (последний, предпоследний разворот и все страницы с
                            пропиской)</Form.Label>
                        <Form.Control
                            type="file"
                            multiple
                            placeholder=""
                            className="form-control-file"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="contract-photo">
                        <Form.Label>Фото розового бланка</Form.Label>
                        <Form.Control
                            type="file"
                            placeholder=""
                            className="form-control-file"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="position-genitive">
                        <Form.Label>Должность в родительном падеже (нет кого?)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="директора"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="FamiliaIO">
                        <Form.Label>Фамилия И.О.</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Гуревич А.А."
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fullname-genitive">
                        <Form.Label>ФИО полностью в родительном падеже (нет кого?)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Гуревича Алексея Андреевича"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fullname-dative">
                        <Form.Label>ФИО полностью в дательном падеже (кому?)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Гуревичу Алексею Андреевичу"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fullname-creative">
                        <Form.Label>ФИО полностью в творительном падеже (с кем?)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Гуревичем Алексеем Андреевичем"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fullname-last">
                        <Form.Label>ФИО полностью (принять кого?)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Гуревича Алексея Андреевича"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={handleSubmit}>
                    Подтвердить
                </Button>
            </Modal.Footer>
        </Modal>

    )
}

export default FormContract