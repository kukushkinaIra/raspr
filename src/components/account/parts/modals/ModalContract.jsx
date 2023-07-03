import React, {useEffect, useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useAuth} from "../../../auth/AuthProvider";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


function ModalContract({showProp, setShowPropFalse, offerId}) {

    const [showState, setShowState] = useState(showProp);
    const {role, id, setRole, setId} = useAuth();
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [pinkBlank, setPinkBlank] = useState("");
    const [passportPhotos, setPassportPhotos] = useState([]);
    const [formData, setFormData] = useState({
        fullname: '',
        phoneNumber: '',
        birthDate: '',
        passportNumber: '',
        passportIssueDate: '',
        passportExpiryDate: '',
        passportAuthority: '',
        passportIdentification: '',
        addressResidence: '',
        addressActual: '',
        institutionName: '',
        faculty: '',
        speciality: '',
        duration: '',
        startDate: '',
        endDate: '',
        positions: '',
        source: '',
        telegram: '',
        groupChannels: '',
        supervisor: '',
        groupHead: '',
        trusteeFirst: '',
        trusteeSecond: '',
        trusteeThird: '',
        employeeRecord: '',
        insuranceCard: '',
        armyCard: '',
        passportPhotos: null,
        pinkBlank: null,
        positionGenitive: '',
        abbreviation: '',
        genitiveCase: '',
        dativeCase: '',
        instrumentalCase: '',
        accusativeCase: '',
    });

    useEffect(() => {
        setShowState(showProp);
    }, [showProp]);

    const handleChange = (event) => {
        const {name, value, files} = event.target;
        if (
            [
                'endDate',
                'startDate',
                'passportExpiryDate',
                'birthDate',
                'passportIssueDate',
            ].includes(name)
        ) {
            const date = new Date(value);
            const isoDateString = date.toISOString().split('T')[0];
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: isoDateString,
            }));
        } else if (name === 'pinkBlank' || name === 'passportPhotos') {
            if (files) {
                const selectedFiles = Array.from(files);
                const allowedTypes = ['image/jpeg', 'image/jpg'];
                const invalidFiles = selectedFiles.filter(
                    (file) => !allowedTypes.includes(file.type)
                );
                if (invalidFiles.length === 0) {
                    if (name === 'pinkBlank') {
                        setPinkBlank(selectedFiles[0]);
                    } else if (name === 'passportPhotos') {
                        setPassportPhotos(selectedFiles);
                    }
                } else {
                    toast.error(
                        'Выберите файлы в формате .jpeg или .jpg',
                        {position: toast.POSITION.BOTTOM_RIGHT}
                    );
                }
            }
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const requestBody = new FormData();
            let order = {
                contract: {
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    position: formData.positions,
                    trusteeFirst: formData.trusteeFirst,
                    trusteeSecond: formData.trusteeSecond,
                    trusteeThird: formData.trusteeThird,
                    addressActual: formData.addressActual,
                    addressResidence: formData.addressResidence,
                    passport: {
                        number: formData.passportNumber,
                        issueDate: formData.passportIssueDate,
                        expiryDate: formData.passportExpiryDate,
                        authority: formData.passportAuthority,
                        identification: formData.passportIdentification,
                        passportPhotos: []
                    },
                    institution: {
                        name: formData.institutionName,
                        faculty: formData.faculty,
                        speciality: formData.speciality
                    },
                    supervisor: formData.supervisor,
                    fullnameCases: {
                        dativeCase: formData.dativeCase,
                        instrumentalCase: formData.instrumentalCase,
                        genitiveCase: formData.genitiveCase,
                        abbreviation: formData.abbreviation
                    },
                    groupHead: formData.groupHead,
                    birthDate: formData.birthDate,
                    telegram: formData.telegram,
                    source: formData.source,
                    pinkBlank: null,
                    armyCard: formData.armyCard,
                    employeeRecord: formData.employeeRecord,
                    insuranceCard: formData.insuranceCard
                },
                user: {
                    id: id
                },
                offer: {
                    id: offerId
                }
            }

            requestBody.append("order", new Blob([JSON.stringify(order)], {type: "application/json"}));
            requestBody.append("pinkBlank", pinkBlank);
            Array.from(passportPhotos).forEach((photo, index) => {
                requestBody.append("passportPhotos", photo);
            });

            console.log(requestBody)
            fetch("/orders/contract", {
                method: "POST",
                body: requestBody,
                credentials: "include"
            })
                .then((response) => {
                    if (response.ok) {
                        toast.success("Заказ был создан успешно", {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                    } else {
                        toast.error("Заказ не был создан", {position: toast.POSITION.BOTTOM_RIGHT});
                        throw new Error(response.status);
                    }
                })
                .catch((error) => {
                    if (error.message === "401") {
                        const authCookie = document.cookie
                            .split(";")
                            .find((cookie) => cookie.startsWith("auth="));
                        if (!authCookie) {
                            setId(null);
                            setRole(null);
                            navigate('/login');
                        }
                    }
                });
            setShowState(false)
            setShowPropFalse();
        }
        setValidated(true)
    };

    const handleClose = () => {
        setShowState(false);
        setShowPropFalse();
    };


    return (
        <Modal show={showState} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Заполните свои данные</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="input-form" noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="fullname">
                        <Form.Label>ФИО полностью</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="fullname"
                            value={formData.fullname}
                            type="text"
                            placeholder="Иванова Татьяна Викторовна"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phoneNumber">
                        <Form.Label>Телефон (12 цифр)</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            type="text"
                            placeholder="+375XXXXXXXXX"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="birthDate">
                        <Form.Label>Дата Рождения</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="birthDate"
                            value={formData.birthDate}
                            type="date"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="passportNumber">
                        <Form.Label>Серия и номер пасспорта</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="passportNumber"
                            value={formData.passportNumber}
                            type="text"
                            placeholder="AB1234567"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="passportIssueDate">
                        <Form.Label>Дата выдачи пасспорта</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="passportIssueDate"
                            value={formData.passportIssueDate}
                            type="date"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="passportExpiryDate">
                        <Form.Label>Дата окончания действия пасспорта</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="passportExpiryDate"
                            value={formData.passportExpiryDate}
                            type="date"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="passportAuthority">
                        <Form.Label>Кем выдан пасспорт</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="passportAuthority"
                            value={formData.passportAuthority}
                            type="text"
                            placeholder="Барановичским ГОВД Брестской обл."
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="passportIdentification">
                        <Form.Label>Личный номер пасспорта</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="passportIdentification"
                            value={formData.passportIdentification}
                            type="text"
                            placeholder="1234567A001PB1"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="addressResidence">
                        <Form.Label>Адресс прописки</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="addressResidence"
                            value={formData.addressResidence}
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="addressActual">
                        <Form.Label>Адресс проживания</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="addressActual"
                            value={formData.addressActual}
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="institutionName">
                        <Form.Label>Наименование учреждения образования</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="institutionName"
                            value={formData.institutionName}
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="faculty">
                        <Form.Label>Наименование факультета</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="faculty"
                            value={formData.faculty}
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="speciality">
                        <Form.Label>Наименование специальности</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="speciality"
                            value={formData.speciality}
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="duration">
                        <Form.Label>Сроки распределения в учереждении образования</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="duration"
                            value={formData.duration}
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="startDate">
                        <Form.Label>Дата начала отработки</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="startDate"
                            value={formData.startDate}
                            type="date"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="endDate">
                        <Form.Label>Дата окончания отработки</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="endDate"
                            value={formData.endDate}
                            type="date"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="positions">
                        <Form.Label>Подходящие должности</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="positions"
                            value={formData.positions}
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="source">
                        <Form.Label>Откуда узнали о нас (соц.сети/реклама/знакомые)</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="source"
                            value={formData.source}
                            type="text"
                            placeholder="конкретный человек, если знакомый"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="telegram">
                        <Form.Label>Имя пользователя в телеграме (ссылка)</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="telegram"
                            value={formData.telegram}
                            type="text"
                            placeholder="https://t.me/AlexHurevich"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="groupChannels">
                        <Form.Label>Ваши студенческие группы, каналы, аккаунты в телеграме и др. соцсетях</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="groupChannels"
                            value={formData.groupChannels}
                            type="text"
                            placeholder="https://t.me/AlexHurevich"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="supervisor">
                        <Form.Label>Куратор распределения (ФИО, должность, телефон городской, мобильный, telegram,
                            viber, полный адрес местонахождения, дни и время работы, e-mail, адрес для почтовой
                            корреспонденции)</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="supervisor"
                            value={formData.supervisor}
                            as="textarea"
                            rows={3}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="groupHead">
                        <Form.Label>Староста (ФИО, номер телефона, telegram, vk, inst)</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="groupHead"
                            value={formData.groupHead}
                            as="textarea"
                            rows={3}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="trusteeFirst">
                        <Form.Label>Доверенное лицо №1</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="trusteeFirst"
                            value={formData.trusteeFirst}
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="trusteeSecond">
                        <Form.Label>Доверенное лицо №2</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="trusteeSecond"
                            value={formData.trusteeSecond}
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="trusteeThird">
                        <Form.Label>Доверенное лицо №3</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="trusteeThird"
                            value={formData.trusteeThird}
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="employeeRecord">
                        <Form.Label>Трудовая книжка (есть/нужно завести)</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="employeeRecord"
                            value={formData.employeeRecord}
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="insuranceCard">
                        <Form.Label>Карта соц. страх. (есть/нужно завести)</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="insuranceCard"
                            value={formData.insuranceCard}
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="armyСard">
                        <Form.Label>Военный билет/приписное свидетельство</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="armyСard"
                            value={formData.armyСard}
                            type="text"
                            placeholder=""
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="passportPhotos">
                        <Form.Label>Фото паспорта (последний, предпоследний разворот и все страницы с
                            пропиской)</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="passportPhotos"
                            value={formData.passportPhotos}
                            type="file"
                            multiple
                            placeholder=""
                            className="form-control-file"
                            accept="image/jpeg, image/jpg"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="pinkBlank">
                        <Form.Label>Фото розового бланка</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="pinkBlank"
                            value={formData.pinkBlank}
                            type="file"
                            placeholder=""
                            className="form-control-file"
                            accept="image/jpeg, image/jpg"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="positionGenitive">
                        <Form.Label>Должность в родительном падеже (нет кого?)</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="positionGenitive"
                            value={formData.positionGenitive}
                            type="text"
                            placeholder="директора"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="abbreviation">
                        <Form.Label>Фамилия И.О.</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="abbreviation"
                            value={formData.abbreviation}
                            type="text"
                            placeholder="Гуревич А.А."
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="genitiveCase">
                        <Form.Label>ФИО полностью в родительном падеже (нет кого?)</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="genitiveCase"
                            value={formData.genitiveCase}
                            type="text"
                            placeholder="Гуревича Алексея Андреевича"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="dativeCase">
                        <Form.Label>ФИО полностью в дательном падеже (кому?)</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="dativeCase"
                            value={formData.dativeCase}
                            type="text"
                            placeholder="Гуревичу Алексею Андреевичу"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="instrumentalCase">
                        <Form.Label>ФИО полностью в творительном падеже (с кем?)</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="instrumentalCase"
                            value={formData.instrumentalCase}
                            type="text"
                            placeholder="Гуревичем Алексеем Андреевичем"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="accusativeCase">
                        <Form.Label>ФИО полностью (принять кого?)</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            required
                            name="accusativeCase"
                            value={formData.accusativeCase}
                            type="text"
                            placeholder="Гуревича Алексея Андреевича"
                        />
                    </Form.Group>
                    <Button
                        className="yellow-button"
                        type="submit">
                        Подтвердить
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>

    )
}

export default ModalContract