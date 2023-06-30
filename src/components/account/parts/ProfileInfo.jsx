import React from 'react';


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
        const userId = localStorage.getItem('id')
        fetch(`/users/${userId}`, {
            method: "GET"
        })
            .then(res => res.json())
            .catch((error) => {
                if (error.message === "401") {
                    const authCookie = document.cookie
                        .split(";")
                        .find((cookie) => cookie.startsWith("auth="));
                    if (!authCookie) {
                        this.props.setId(null);
                        this.props.setRole(null);
                        this.props.navigate('/login');
                    }
                }
                this.setState({
                    isLoaded: true,
                    error,
                });
                return Promise.reject();
            })
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