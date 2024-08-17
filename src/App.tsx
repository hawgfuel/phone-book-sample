import React, { useState } from 'react';
import { PhoneBook } from "./pages/phonebook/phonebook";
import { DataTable } from './components/phone-book-table/phone-book-table';

// Define the user data type
interface UserData {
  userFirstname: string;
  userLastname: string;
  userPhone: string;
}

function App() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [sortKey, setSortKey] = useState<keyof UserData | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const addEntryToPhoneBook = (newUser: UserData) => {
    setUserData((prevUserData) => {
      const updatedUserData = [...prevUserData, newUser];
      updatedUserData.sort((a, b) => a.userLastname.localeCompare(b.userLastname));
      return updatedUserData;
    });
  };

  const handleSort = (key: keyof UserData) => {
    let order: 'asc' | 'desc' = sortOrder;
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
    <div className="App">
      <PhoneBook addEntryToPhoneBook={addEntryToPhoneBook} />
      <DataTable userData={userData} handleSort={handleSort} sortKey={sortKey} sortOrder={sortOrder} />
    </div>
  );
}

export default App;
