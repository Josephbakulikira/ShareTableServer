import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import myUrl from '../URL';

function RoomsTab({user}) {
    const [rooms, setRooms] = useState([]);

    useEffect(()=>{
        get_all_rooms();
    }, [])

    async function get_all_rooms(){
        try{
            const serveurs = await axios.post( myUrl + "/api/rooms/getallrooms", {userid: user._id})
            setRooms(serveurs.data)
        }catch(error){
            toast.error(error.message)
        }
    }

    async function delete_room(id){
      try{
        const res = await axios.post(myUrl + "/api/rooms/deleteroom", {room_id: id, user_id: user._id})
        if(res){
          toast("serveur supprimé");
          get_all_rooms();
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
                <th>Serveur ID</th>
                <th>Id Du Createur</th>
                <th>Nom</th>
                <th>mot de passe</th>
              </tr>
            </thead>
            <tbody>
              {rooms.length &&
                [...rooms].reverse().map((room) => {
                  return (
                    <tr key={room._id}>
                      <td>{room._id}</td>
                      <td>{room.creatorId}</td>
                      <td>{room.name}</td>
                      <td>{room.password}</td>
                      <td>
                        <button
                          onClick={() => delete_room(room._id)}
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

export default RoomsTab