import React, { useState, useId, ChangeEvent, FormEvent } from 'react';

// Define the type for the form data and the props
interface UserData {
  userFirstname: string;
  userLastname: string;
  userPhone: string;
}

interface PhoneBookProps {
  addEntryToPhoneBook: (newUser: UserData) => void;
}

export function PhoneBook({addEntryToPhoneBook}: PhoneBookProps) {
    const [formIsValid, setFormIsValid] = useState(true);
    const [formData, setFormData] = useState<UserData>({userFirstname: '', userLastname: '', userPhone: ''});

    function validateForm() {
      if (Object.values(formData).includes('')) {
        setFormIsValid(false);
        return false;
      } else {
        setFormIsValid(true);
        return true;
      }
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>){
      const isValid = validateForm();
      if(isValid){
        e.preventDefault();
        addEntryToPhoneBook(formData);
        setFormData({userFirstname: '', userLastname: '', userPhone: ''});
      }
    };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const ids =  useId();

    return (
        <div className='container row bs-component col-lg-4 mx-auto d-grid gap-3'>
          <h1 className='page-header p-2'>React Phonebook</h1>
          <p>Enter first name, last name and phone number in the form below to create a directory or phone book seen in the table below.</p>
          {!formIsValid && 
              <p className='text-danger'>*All fields are required</p>
          }  
          <form id="phoneBook" className='content-start p-2'  onSubmit={handleSubmit}> 
            <fieldset> 
            <div className='form-group row p-2'>
              <label className='content-start' htmlFor={ids + `userFirstname`}>First name:</label>
                <input 
                    id={ids + `userFirstname`}
                    className='userFirstname form-control'
                    name='userFirstname' 
                    placeholder={'First name'}
                    value={formData.userFirstname}
                    required={true}
                    onChange={(e) => handleChange(e)}
                    type='text'
                />
              </div>
              <div className='form-group row  p-2'>
                <label htmlFor={ids + `userLastname`}>Last name:</label>
                  <input 
                      id={ids + `userLastname`}
                      className='userLastname form-control'
                      name='userLastname' 
                      value={formData.userLastname}
                      placeholder={'Last name'}
                      onChange={(e) => handleChange(e)}
                      type='text' 
                  />
              </div>
              <div className='form-group row  p-2'>
                <label htmlFor={ids + `userPhone`}>Phone:</label>
                <input
                    id={ids + `userPhone`}
                    className='userPhoneform-control form-control'  
                    name='userPhone' 
                    value={formData.userPhone}
                    placeholder={'Phone number'}
                    onChange={(e) => handleChange(e)}
                    type='text'
                />
              </div>
              <div className='bs-component mb-20  p-2'>
              <input 
                className='submitButton  mustard-bg'
                type='submit' 
                value='Add User' 
              />
            </div>
            </fieldset>
          </form>
      </div>
    )
}
