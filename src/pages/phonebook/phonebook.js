import React, { useState } from 'react';
import { DataTable } from '../../components/phone-book-table/phone-book-table';

export function PhoneBook() {
    const [formData, setFormData] = useState({firstName: '', lastName: '', phoneNumber: ''});
    const [userData, setUserData] = useState([]);
    const [formIsValid, setFormIsValid] = useState(true);
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    function validateForm() {
      if (Object.values(formData).includes('')) {
        setFormIsValid(false);
        return false;
      } else {
        setFormIsValid(true);
        return true;
      }
    }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

    function saveUser(){
      const isValid = validateForm();
      if(isValid){
        if(userData.length > 0){
          setUserData( [...userData, formData]);
        } else {
          setUserData([formData]);
        }
      }
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
          <p>Enter first name, last name and phone number in the form below to create a directory or phone book seen in the table below.</p>
          {!formIsValid && 
              <p className='text-danger'>*All fields are required</p>
          }  
          <form id="phoneBook" className='content-start p-2' onSubmit={e => { e.preventDefault() }}> 
            <fieldset> 
            <div className='form-group row p-2'>
              <label className='content-start'>First name:</label>
                <input 
                    className='userFirstname form-control'
                    name='firstName' 
                    placeholder={'First name'}
                    value={formData.firstName}
                    required={true}
                    onChange={(e) => handleChange(e)}
                    type='text'
                />
              </div>
              <div className='form-group row  p-2'>
                <label>Last name:</label>
                  <input 
                      className='userLastname form-control'
                      name='lastName' 
                      value={formData.lastName}
                      placeholder={'Last name'}
                      onChange={(e) => handleChange(e)}
                      type='text' 
                  />
              </div>
              <div className='form-group row  p-2'>
                <label>Phone:</label>
                <input
                    className='userPhoneform-control form-control'  
                    name='phoneNumber' 
                    value={formData.phoneNumber}
                    placeholder={'Phone number'}
                    onChange={(e) => handleChange(e)}
                    type='text'
                />
              </div>
              <div className='bs-component mb-20  p-2'>
                <button 
                    className='btn mustard-bg btn-lg'
                    type='button' 
                    onClick={() => saveUser()}>Add User</button>
            </div>
            </fieldset>
          </form>
          <DataTable userData={userData} handleSort={handleSort} sortKey={sortKey} sortOrder={sortOrder} />
      </div>
    )
}
