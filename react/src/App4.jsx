import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto my-10 p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={fetchData}
      >
        Fetch Data
      </button>
      {isLoading && <p className="mt-4 text-blue-500">Loading...</p>}
      {error && <p className="mt-4 text-red-500">Error fetching users</p>}
      <table className="mt-4 w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Language</th>
            <th className="border p-2">Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border">
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.language}</td>
              <td className="border p-2">{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
