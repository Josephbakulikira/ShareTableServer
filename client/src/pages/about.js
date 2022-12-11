import React from "react";
import { IntlProvider } from "react-intl";
import Layout from "../components/sidebar/layout";
import "./css/about.css";

function AboutPage() {
  return (
    <IntlProvider>
      <Layout>
        <div>
          <div className="row thisrow justify-content-around">
          <h3>Welcome to Shared Excel</h3>

            <p style={{color: "Black"}}>Shared excel C'est un site qui t'aide a partager un tableau pareil a excel facilement, tu peux aussi faire des operation de ces tableau facilement</p>
          </div>
        </div>
      </Layout>
    </IntlProvider>
  );
}

export default AboutPage;
