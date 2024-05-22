    
    export function DataTable({userData, handleSort, sortKey, sortOrder} ) {
        return (
        <div className='table-container'>
            <h2>Phonebook</h2>
            <p>Sort by last name</p>
            <table className='w-100 p-3 p-2'>
                <thead className='mustard-bg'> 
                <tr>
                    <th className='p-2'><span>First name</span></th>
                    <th className={`p-2 ${sortOrder}`} onClick={() => handleSort('lastName')}><span>Last name</span></th>
                    <th className='p-2'><span>Phone</span></th>
                </tr> 
                </thead> 
                <tbody>
                    {userData.length > 0  && userData.map((user, index) => (
                    <tr className="table-dark" id={`user-${index}`} key={index}>
                        <td className='p-2'>{user.firstName}</td>
                        <td className='p-2'>{user.lastName}</td>
                        <td className='p-2'>{user.phoneNumber}</td>
                        </tr>
                    ))}
            </tbody>
            </table>
          </div>
        );
      }