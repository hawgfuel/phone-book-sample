import React, { useState } from 'react';
import './form.css';


export function PhoneBook() {
    const [userFirstname, setUserFirstname] = useState("");
    const [userLastname, setUserLastname] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userData, setUserData] = useState([{}]);
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    let getFormData = {
        userFirstname: userFirstname,
        userLastname: userLastname,
        userPhone: userPhone
    } 
    let dataArr = [];

    function saveUser(){
        if(userData[0].userFirstname){
            userData.forEach(function (user) {
                dataArr.push({
                    userFirstname: user.userFirstname,
                    userLastname: user.userLastname,
                    userPhone: user.userPhone
                })
            });
        }
        dataArr.push(getFormData);
        setUserData(dataArr);
    };

    const handleSort = (key) => {
        let order = sortOrder;
        if (sortKey === key) {
          order = sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
          order = 'asc';
        }
    
        const sortedData = [...userData].sort((a, b) => {
          if (order === 'asc') {
            return a[key] > b[key] ? 1 : -1;
          } else {
            return a[key] < b[key] ? 1 : -1;
          }
        });
    
        setSortKey(key);
        setSortOrder(order);
        setUserData(sortedData);
      };

    return (
        <>
        <h1>Phone book code challenge</h1>
        <form id="phoneBook" onSubmit={e => { e.preventDefault() }} style={style.form.container}>
            <label>First name:</label>
            <br />
            <input 
                style={style.form.inputs}
                className='userFirstname'
                name='userFirstname' 
                value={userFirstname}
                onChange={(e) => setUserFirstname(e.target.value)}
                type='text'
            />
            <br/>
            <label>Last name:</label>
            <br />
            <input 
                style={style.form.inputs}
                className='userLastname'
                name='userLastname' 
                value={userLastname}
                onChange={(e) => setUserLastname(e.target.value)}
                type='text' 
            />
            <br />
            <label>Phone:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userPhone' 
                name='userPhone' 
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                type='text'
            />
            <br/>
            <input 
                style={style.form.submitBtn} 
                className='submitButton'
                type='submit' 
                value='Add User' 
                onClick={() => saveUser()}
            />
        </form>
        {/* <pre>
          {JSON.stringify(userData, undefined, 2)}
        </pre> */}
        <InformationTable />
    </>
    )
    
    function InformationTable(props) {
        return (
        <>
            <h2>Phone book</h2>
            <table className='informationTable'>
                <thead> 
                <tr>
                    <th style={style.tableCell}>First name</th>
                    <th style={style.tableCell} onClick={() => handleSort('userLastname')}>Last name</th>
                    <th style={style.tableCell}>Phone</th>
                </tr> 
                </thead> 
                {userData[0].userFirstname && userData.map((user, index) => (
                <tr id={`user-${index}`} key={index}>
                    <td style={style.tableCell}>{user.userFirstname}</td>
                    <td style={style.tableCell}>{user.userLastname}</td>
                    <td style={style.tableCell}>{user.userPhone}</td>
                    </tr>
                ))}
            </table>
          </>
        );
      }
}

const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border:'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    }
  }
}