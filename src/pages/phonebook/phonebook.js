import React, { useState } from 'react';

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
        <div className='container row bs-component col-lg-4 mx-auto d-grid gap-3'>
          <h1 className='page-header p-2'>React Phonebook</h1>
          <p>Enter first name, last name and phone number in the form below to create a directory or phone book.</p>
          <form id="phoneBook" className='content-start p-2' onSubmit={e => { e.preventDefault() }}>
            <fieldset>
            <div className='form-group row p-2'>
              <label className='content-start'>First name:</label>
                <input 
                    className='userFirstname form-control'
                    name='userFirstname' 
                    value={userFirstname}
                    onChange={(e) => setUserFirstname(e.target.value)}
                    type='text'
                />
              </div>
              <div className='form-group row  p-2'>
                <label>Last name:</label>
                  <input 
                      className='userLastname form-control'
                      name='userLastname' 
                      value={userLastname}
                      onChange={(e) => setUserLastname(e.target.value)}
                      type='text' 
                  />
              </div>
              <div className='form-group row  p-2'>
                <label>Phone:</label>
                <input
                    className='userPhoneform-control form-control'  
                    name='userPhone' 
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    type='text'
                />
              </div>
              <div className='bs-component mb-20  p-2'>
                <button 
                    className='btn btn-primary btn-lg'
                    type='button' 
                    onClick={() => saveUser()}>Add User</button>
            </div>
            </fieldset>
          </form>
          <InformationTable />
      </div>
    )
    
    function InformationTable(props) {
        return (
        <div className='table-container'>
            <h2>Phonebook</h2>
            <p>Sort by last name</p>
            <table className='w-100 p-3'>
                <thead> 
                <tr>
                    <th>First name</th>
                    <th onClick={() => handleSort('userLastname')}>Last name</th>
                    <th>Phone</th>
                </tr> 
                </thead> 
                {userData[0].userFirstname && userData.map((user, index) => (
                <tr id={`user-${index}`} key={index}>
                    <td>{user.userFirstname}</td>
                    <td>{user.userLastname}</td>
                    <td>{user.userPhone}</td>
                    </tr>
                ))}
            </table>
          </div>
        );
      }
}
