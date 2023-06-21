import React from 'react';
import Table from 'react-bootstrap/Table';


export default class TableOrders extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      _embedded: {},
      content:[]
    };
  }

  componentDidMount() {
    fetch("http://213.109.204.76:8080/orders")
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

  render() {

const { error, isLoaded, content } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else {
      return (
        <div>
            <Table responsive striped hover>
                                    <thead>
                                        <tr>
                                        <th >Наименование услуги</th>
                                        <th >Статус заказа</th>
                                        <th >Статус оплаты</th>
                                        <th >Примечания</th>
                                        <th >Дата заказа</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {content.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.offer.title}</td>
                                                {item.status ==="REVIEW" &&
                                                  <td>
                                                    В обработке
                                                  </td>
                                                }
                                                {item.status ==="ACCEPTED" &&
                                                    <td>
                                                        Ожидание платежа
                                                    </td>
                                                }
                                                <td>
                                                  {item.payments.map(pay=>(
                                                    <p>
                                                      {pay.status ==="UNAVAILABLE" &&
                                                        <span>Недоступно</span>
                                                      }
                                                    </p>
                                                  ))}
                                                </td>
                                                <td>Менеджер проверяет ваш заказ</td>
                                                <td>03.09.2023</td>
                                            </tr>
                                          ))}
                                    </tbody>
              </Table>
        </div>
      );
    }
  }
}