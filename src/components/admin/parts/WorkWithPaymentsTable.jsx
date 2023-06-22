import React from 'react';
import Table from 'react-bootstrap/Table';


export default class WorkWithPaymentsTable extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data:[]
    };
  }

  componentDidMount() {
    fetch("http://213.109.204.76:8080/orders/manager/21")
      .then(res => res.json())
    .then(
        data => {
        this.setState({
            data, 
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

const { error, data } = this.state;
    // eslint-disable-next-line no-lone-blocks
    return(
        <Table responsive striped bordered hover>
        <thead>
            <tr>
                <th >ФИО</th>
                <th >Услуга</th>
                <th >Цена</th>
                <th >Дата заказа</th>
            </tr>
        </thead>
        <tbody>
            {data.map(item => (
                <tr>
                        <td>{item.user.firstname} {item.user.lastname}</td>
                        <td>{item.offer.title}</td>
                        <td>{item.payments.map(paymentsItem => (
                            <span>{paymentsItem.price}</span>
                        ))}</td>
                        <td>{item.createdAt}</td>
                </tr>
                
                ))}
        </tbody>
</Table>
    )
   
    // {data.map(item =>{
    //     console.log(item)

    //         for (let key in item) {
    //             return (
    //                 // console.log(item["managerId"])
    //             );
    //         }
    // })}

    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } 
    // else {
    //   return (
    //     <div>
            
    //     </div>
    //   );
    // }
  }
}