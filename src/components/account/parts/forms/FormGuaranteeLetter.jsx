import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';


function FormGuaranteeLetter() {
    const handleSubmit = event => {
        event.preventDefault();
        const formData = {
            name: event.target.elements.name.value,
            speciality: event.target.elements.speciality.value,
            recipient: event.target.elements.recipient.value,
            recipientPosition: event.target.elements.recipient_position.value,
            university: event.target.elements.university.value,
            // document: event.target.elements.document.files[0],
            document: null,
        };
        console.log(formData);
        // TODO: отправка на сервер
        fetch('/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    console.log('Запрос успешно отправлен');
                } else {
                    console.log('Ошибка при отправке запроса');
                }
            })
            .catch(error => {
                console.log('Ошибка при отправке запроса', error);
            });
    };


    return (
        <Form>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>ФИО (вин. падеж)</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    placeholder="Иванову Татьяну Викторовну"
                    autoFocus
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="speciality">
                <Form.Label>Специальность</Form.Label>
                <Form.Control
                    type="text"
                    name="speciality"
                    placeholder="Инженер-программист"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="recipient">
                <Form.Label>Кому адресовано письмо (род.падеж)</Form.Label>
                <Form.Control
                    type="text"
                    name="recipient"
                    placeholder="Петрову Олегу Ивановичу"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="recipient_position">
                <Form.Label>Должность адресата (род. падеж)</Form.Label>
                <Form.Control
                    type="text"
                    name="recipient_position"
                    placeholder="Ректору Белорусского Государственного университета"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="university">
                <Form.Label>Наименование учреждения образования</Form.Label>
                <Form.Select aria-label="Default select example" name="university">
                    <option value="" disabled selected hidden>Выберите свой университет</option>
                    <option value="БГУ">БГУ</option>
                    <option value="БГУИР">БГУИР</option>
                    <option value="БНТУ">БНТУ</option>
                    <option value="БГЭУ">БГЭУ</option>
                    <option value="МГЛУ">МГЛУ</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="document">
                <Form.Label>Шаблон документа</Form.Label>
                <Form.Control
                    type="file"
                    name="document"
                    className="form-control-file"
                />
            </Form.Group>
        </Form>
    );
}

export default FormGuaranteeLetter