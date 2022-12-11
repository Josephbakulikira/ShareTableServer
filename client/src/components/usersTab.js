import {useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import myUrl from '../URL'

function UsersTab({user}){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [users, setusers] = useState([])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        get_all_users()
    }, [])

    async function get_all_users(){
        try{
            const utilisateurs = await axios.post(myUrl + "/api/users/getallusers", {userid: user._id})
            setusers(utilisateurs.data);
        }catch(error){
            toast.error(error.message)
        }
    }

    async function delete_user(id){
        try{
            const res = await axios.post(myUrl + "/api/users/deleteuser", {id: id, userid: user._id})
            if(res){
                get_all_users();
                toast("utilisateur supprimé ")
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    return (
        <div>
            <div className="row">
      <div className="col-md-12">
        <div style={{ overflowX: "auto" }}>
          <table className="table table-bordered table-dark">
            <thead className="box-shadow3">
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>email</th>
                <th>numero</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {users.length &&
                [...users].reverse().map((utilisateur) => {
                  return (
                    <tr key={utilisateur._id}>
                      <td>{utilisateur._id}</td>
                      <td>{utilisateur.name}</td>
                      <td>{utilisateur.email}</td>
                      <td>{utilisateur.phonenumber}</td>
                      <td>{utilisateur.status}</td>
                      <td>
                        <button
                          onClick={() => delete_user(utilisateur._id)}
                          className="btn btn-danger "
                        >
                          supprimer
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
        </div>
    )
}

export default UsersTab