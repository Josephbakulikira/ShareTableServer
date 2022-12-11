import React, { useState, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/sidebar/layout";
import messages from "../messages.js";
import axios from "axios";
import "./css/server.css"
import ServerProject from "../components/ServerProject";
import myUrl from "../URL";

function Serveur() {
  const [locale, setLocale] = useState("en");
  const [serverid, setServerId] = useState();
  const [serverData, setServer] = useState();
  const navigate = useNavigate();
  const user = JSON.parse(window.localStorage.getItem("currentUser")).data;
  const parameters = useMatch("/servers/:id").params;

  useEffect(() => {
    if (window.localStorage.getItem("currentUser")) {
      setServerId(parameters.id);
      GetServer();
    } else {
      navigate("/login");
    }
  }, []);

  async function GetServer() {
    try {
      const Server = await axios.post(myUrl + "/api/rooms/getroombyid", {
        room_id: parameters.id,
        user_id: user._id,
      });
      if (Server) {
        // console.log(Server)
        setServer(Server.data);
      } else {
        navigate(`/access/${parameters.id}`);
      }
    } catch (err) {
      navigate(`/access/${parameters.id}`);
    }
  }

  function myFunction() {
    /* Get the text field */
    var copyText = window.location.origin + "/access/" + parameters.id;
  
    // /* Select the text field */
    // copyText.select();
    // copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText);
  
    /* Alert the copied text */
    toast.info("vous avez copié le lien: " + copyText.value , {theme: "colored"} );
  }

  return (
    <>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Layout setLocale={setLocale}>
          {serverData && (
            <div>
              <div>
                <div className="row">
                  <div className="col-lg-6 col-xs-12">
                    <button onClick={myFunction} className="btn-hover color-7">
                      Inviter
                    </button>
                  </div>
                  <div className="col-lg-6 col-xs-12">
                    {/* {serverData.creatorId === user._id ? (
                      <>

                        <button className="btn-hover color-8">
                          Upload File
                        </button>
                      </>
                    ) : (
                      <button className="btn-hover color-8 disabled">
                        CreateProject
                      </button>
                    )} */}
                  </div>
                </div>
                <hr/>
                <div className="row">
                  <p
                    style={{ letterSpacing: "2px", textTransform: "uppercase" }}
                  >
                    <strong
                      style={{
                        letterSpacing: "0.5px",
                        textTransform: "lowercase",
                      }}
                    >
                      Nom du Serveur:{" "}
                    </strong>
                    {serverData.name}
                  </p>
                  <p style={{ color: "gray" }}>
                    <strong>ID du Serveur: </strong>
                    {serverData.creatorId}
                  </p>
                </div>
                <hr/>
                <div className="row serveurcontainer">
                    <ServerProject data={null} serverid={serverData._id} serverpassword={serverData.password} />
                </div>
              </div>
            </div>
          )}
        </Layout>
      </IntlProvider>
    </>
  );
}

export default Serveur;
