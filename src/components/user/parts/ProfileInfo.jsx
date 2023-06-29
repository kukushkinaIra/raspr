import React from 'react';
import data from "bootstrap/js/src/dom/data";


export default class ProfileInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            userInfo: null
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/users/15", {
            method: "GET"
        })
            .then(res => res.json())
            .then(
                data => {
                    this.setState({
                        isLoaded: false,
                        userInfo: data
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

    render() {
        const {error, isLoaded, userInfo} = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        }
        return (
            <div>
                {/*<p>Имя: {userInfo.id}</p>*/}
                {/*<p>Фамилия: {userInfo.lastname}</p>*/}
                {/*<p>Статус: {userInfo.status}</p>*/}
                {/*<p>Email: {userInfo.email}</p>*/}
            </div>
        );
    }
}