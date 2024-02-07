import React, { useEffect, useState } from 'react';
import useAuth from '../../hook/useAuth';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";


const AdminVerifyProvider = () => {
 
    const { user } = useAuth()
  const [allprovider, setAllProvider] = useState([])
  const url = "http://localhost:5000/users/allprovider"

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setAllProvider(data))
  }, [])


  const MakeApproved = user =>{
     console.log(user)
    fetch(`http://localhost:5000/users/approved/${user._id}`, {
        method: 'PUT'
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
         console.log(data.modifiedCount)
        if(data.modifiedCount){
            // refetch();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "user Accepted",
                showConfirmButton: false,
                timer: 1500
              })
        }
    })
}
  const MakeDenied= user =>{
    fetch(`http://localhost:5000/users/denied/${user._id}`, {
        method: 'PATCH'
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
         console.log(data.modifiedCount)
        if(data.modifiedCount){
            // refetch();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "user Accepted",
                showConfirmButton: false,
                timer: 1500
              })
        }
    })
}


  return (
    <div>
      <p className="text-3xl font-bold ml-5 mb-5">All User List</p>
      <div className="overflow-x-auto w-full mt-12">
        <table className="table w-full">
          
          <thead>
            <tr>
              <th>#</th>
              <th> Provider Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              
              
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allprovider.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>

                <td>{user.user_fullname}</td>
                <td>{user.user_email}</td>
                <td>{user.user_phone}</td>
                <td>{user.user_location}</td>
                <td>{user.admin_approval}</td>
             

                <td>
                { user.admin_approval === 0 &&  <>
                                    <button   onClick={() => MakeApproved(user)} className="btn btn-ghost bg-gray-600 mx-3  text-white">Approved</button> 
                                    <button  onClick={() => MakeDenied(user)} className="btn btn-ghost bg-red-600  text-white">Denied</button></>
                                     || user.admin_approval === 1 && <><button disabled  onClick={() => MakeApproved(user)} className="btn btn-ghost bg-gray-600  text-white">Approved</button> 
                                    <button disabled onClick={() => MakeDenied(user)} className="btn btn-ghost bg-red-600  text-white mx-3">Denied</button></> 
                                    }
                                     <Link className="btn btn-ghost bg-green-600  text-white ml-2" to={`/dashboard/adminverifyprovider/view/${user._id}`}> Details</Link>            
                                    {/* <button  onClick={()=> MakeView(user)}  >Details</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default AdminVerifyProvider;