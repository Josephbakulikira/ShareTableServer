import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';
import myUrl from '../URL';

function ProjectTab({user}) {
    const [projects, setProjects] = useState([])
    useEffect(()=>{
        get_all_projects();
    }, [])

    async function get_all_projects(){
        try{
            const projets = await axios.post(myUrl + "/api/projects/get-all-projects", {userid: user._id})
            setProjects(projets.data)
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
                <th>Nom</th>
                <th>Id du createur</th>
                <th>Id du serveur</th>
              </tr>
            </thead>
            <tbody>
              {projects.length &&
                [...projects].reverse().map((utilisateur) => {
                  return (
                    <tr key={utilisateur._id}>
                      <td>{utilisateur.name}</td>
                      <td>{utilisateur.creatorId}</td>
                      <td>{utilisateur.roomId}</td>
                      
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

export default ProjectTab