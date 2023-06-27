import React from "react";
import Table from 'react-bootstrap/Table';
import {saveAs} from 'file-saver';
import Docxtemplater from 'docxtemplater';
import {MdKeyboardArrowDown, MdKeyboardArrowRight, MdSimCardDownload} from 'react-icons/md';
import {Document, Page, PDFDownloadLink, Text, StyleSheet, Font, View} from "@react-pdf/renderer";
import MontserratRegular from '../../../fonts/Montserrat/Montserrat-Regular.ttf';
import MontserratMedium from '../../../fonts/Montserrat/Montserrat-Medium.ttf';

export default class AllClientsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            expandedRow: null,
            content: []
        };
    }

    toggleRow = (rowId) => {
        this.setState((prevState) => ({
            expandedRow: prevState.expandedRow === rowId ? null : rowId
        }));
    };

    componentDidMount() {
        fetch("http://213.109.204.76:8080/users")
            .then(res => res.json())
            .then(
                data => {
                    this.setState({
                        content: data.content,
                        isLoading: false,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    getUserInstitution(orders) {
        const order = this.getLatestOrderWithInfo(orders);
        return order ? (order.contract ? order.contract.institution.name : order.shortInfo.institution) : '';
    }

    getLatestOrderWithInfo(orders) {
        const sortedOrders = orders
            .filter(order => order.contract || order.shortInfo)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return sortedOrders[0] || null;
    }

    parseUserStatus(status) {
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

    buildExpandedRow(user) {
        let userBlock, questionnaireBlock = (<div hidden></div>);

        userBlock = (
            <div className="expended_padding_block">
                <div className="expanded_info_div"><b>ФИО полностью:</b> {user.lastname} {user.lastname} {user.surname}
                </div>
                <div className="expanded_info_div"><b>Телефон:</b> {user.phoneNumber}</div>
                <div className="expanded_info_div"><b>Телеграм:</b> {user.telegram}</div>
                <div className="expanded_info_div"><b>Инстаграм:</b> {user.instagram}</div>
                <div className="expanded_info_div"><b>Статус:</b> {this.parseUserStatus(user.status)}</div>
                <div className="expanded_info_div"><b>Дата рождения:</b> {user.birthDate}</div>
                <div className="expanded_info_div"><b>Компания:</b> {user.firm}</div>
            </div>)

        if (user.questionnaire.gender) {
            const questionnaire = user.questionnaire;
            questionnaireBlock = (
                <div className="expended_padding_block">
                </div>
            )
        }

        return (<tr className="expanded_row">
                <td colSpan={4}>
                    {userBlock}
                </td>
                <td colSpan={3}>
                    {questionnaireBlock}
                </td>
            </tr>
        );
    }


    // buildPdf = (user) => {
    //     Font.register({
    //         family: 'Montserrat',
    //         fonts: [
    //             {src: MontserratRegular, fontWeight: 'normal'},
    //             {src: MontserratMedium, fontWeight: '500'}
    //         ]
    //     });
    //
    //     const styles = StyleSheet.create({
    //         page: {
    //             fontFamily: 'Montserrat',
    //             flexDirection: 'column',
    //             backgroundColor: '#E4E4E4',
    //             fontSize: 14
    //         },
    //         section: {
    //             padding: 10,
    //             flexGrow: 1
    //         },
    //         boldText: {
    //             fontWeight: 500,
    //         },
    //         infoBlock: {
    //             fontWeight: 500,
    //             textDecoration: "underline"
    //         }
    //     });
    //     let userBlock, questionnaireBlock;
    //
    //     userBlock = (
    //         <Text style={styles.section}>
    //             <Text style={styles.infoBlock}>Оснвная информация </Text>{'\n'}
    //             <Text style={styles.boldText}>ФИО полностью: </Text>{user.lastname} {user.lastname} {user.surname}
    //             {'\n'}
    //             <Text style={styles.boldText}>Телефон: </Text>{user.phoneNumber}
    //             {'\n'}
    //             <Text style={styles.boldText}>Телеграм: </Text>{user.telegram}
    //             {'\n'}
    //             <Text style={styles.boldText}>Инстаграм: </Text>{user.instagram}
    //             {'\n'}
    //             <Text style={styles.boldText}>Статус: </Text> {this.parseUserStatus(user.status)}
    //             {'\n'}
    //             <Text style={styles.boldText}>Дата рождения: </Text>{user.birthDate}
    //             {'\n'}
    //             <Text style={styles.boldText}>Компания: </Text>{user.firm}
    //         </Text>
    //     );
    //
    //     if (user.questionnaire.gender) {
    //         const questionnaire = user.questionnaire;
    //         questionnaireBlock = (
    //             <Text>
    //                 {/* Код для questionnaireBlock */}
    //             </Text>
    //         );
    //     }
    //     return (
    //         <Document>
    //             <Page size="A4" style={styles.page}>
    //                 {userBlock}
    //                 {questionnaireBlock}
    //             </Page>
    //         </Document>
    //     );
    // }

    render() {


        const {error, content, expandedRow} = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else {
            return (
                <div>
                    <Table responsive striped hover>
                        <thead>
                        <tr>
                            <th>ФИО</th>
                            <th>Фирма</th>
                            <th>Телефон</th>
                            <th>Университет</th>
                            <th>Email</th>
                            <th>Скачать</th>
                        </tr>
                        </thead>
                        <tbody>
                        {content.map(user => (
                            <React.Fragment key={user.id}>
                                <tr>
                                    <td onClick={() => this.toggleRow(user.id)}>
                                         <span className="arrow-icon">
                                         {expandedRow === user.id ? (<MdKeyboardArrowDown/>) : (<MdKeyboardArrowRight/>
                                         )}
                                        </span>
                                        {user.firstname} {user.lastname}</td>
                                    <td onClick={() => this.toggleRow(user.id)}>{user.firm}</td>
                                    <td onClick={() => this.toggleRow(user.id)}>{user.phoneNumber}</td>
                                    <td onClick={() => this.toggleRow(user.id)}>
                                        {this.getUserInstitution(user.orders)}
                                    </td>
                                    <td onClick={() => this.toggleRow(user.id)}>{user.email}</td>
                                    <td>
                                        {/*<PDFDownloadLink className="table-download-button"*/}
                                        {/*                 document={this.buildPdf(user)}*/}
                                        {/*                 fileName={user.firstname + ".pdf"}>*/}
                                        {/*    {({blob, url, loading, error}) => (loading ? 'Загрузка...' : 'PDF')}*/}
                                        {/*</PDFDownloadLink>*/}
                                        <button className="table-download-button">
                                            pdf
                                        </button>
                                        <button className="table-download-button">
                                            doc
                                        </button>
                                    </td>
                                </tr>
                                {expandedRow === user.id && (this.buildExpandedRow(user))}
                            </React.Fragment>
                        ))}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}