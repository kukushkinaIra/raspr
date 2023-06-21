import React from 'react';


export default class MainUserIfo extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/users/15")
      .then(res => res.json())
    .then(
        data => {
        this.setState({
          isLoading: false,
          data
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

const { error, data } = this.state;
        for (let key in data) {
                return (
                <div>
                    <p>Имя: {data["firstname"]}</p>
                    <p>Фамилия: {data["lastname"]}</p>
                    <p>Статус: {data["status"]}</p>
                    <p>Email: {data["email"]}</p>
                </div>
                );
          }
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    // } else {
    //   return (
    //     <div>
            
    //     </div>
    //   );
     }
  }
}