    
    // Define the type for individual user data
    interface UserData {
        userFirstname: string;
        userLastname: string;
        userPhone: string;
    }
    // Define the props for the DataTable component
    interface DataTableProps {
        userData: UserData[];
        handleSort: (key: keyof UserData) => void;
        sortKey: keyof UserData | null;
        sortOrder: 'asc' | 'desc';
    }
  
    export function DataTable({userData, handleSort, sortKey, sortOrder}: DataTableProps ) {
        return (
        <div className='table-container  col-lg-4 mx-auto d-grid gap-3'>
            <h2>Phonebook</h2>
            <p>Sort by last name</p>
            <table className='w-100 p-3 p-2'>
                <thead className='mustard-bg'> 
                <tr>
                    <th className='p-2'><span>First name</span></th>
                    <th className={`p-2 ${sortOrder}`} onClick={() => handleSort('userLastname')}><span>Last name</span></th>
                    <th className='p-2'><span>Phone</span></th>
                </tr> 
                </thead> 
                <tbody>
                    {userData.length > 0  && userData.map((user, index) => (
                    <tr className="table-dark" id={`user-${index}`} key={index}>
                        <td className='p-2'>{user.userFirstname}</td>
                        <td className='p-2'>{user.userLastname}</td>
                        <td className='p-2'>{user.userPhone}</td>
                        </tr>
                    ))}
            </tbody>
            </table>
          </div>
        );
      }