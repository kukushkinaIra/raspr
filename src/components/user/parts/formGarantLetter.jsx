import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function FormGarantLetter(){
    return(
        <Form>
            <h6 className="form_heading">Заполните свои данные</h6>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>ФИО (вин. падеж)</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Иванову Татьяну Викторовну"
                    autoFocus
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Специальность</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Инженер-программист"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Кому адресовано письмо (род.падеж)</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Петрову Олегу Ивановичу"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Должность адресата (род. падеж)</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ректору Белорусского Государственного университета"
                />
            </Form.Group>
            

            <Form.Group className="mb-3" controlId="university">
                <Form.Label>Наименование учереждения образования</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option value="1">БГУ</option>
                    <option value="2">БГУИР</option>
                    <option value="3">БНТУ</option>
                    <option value="3">БГЭУ</option>
                    <option value="3">МГЛУ</option>
                </Form.Select>
            </Form.Group>

        </Form>

    )
}

export default FormGarantLetter