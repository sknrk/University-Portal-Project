
import React, { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout/Layout";
import Head from "next/head";
import styles from "../styles/RequestAndObjection.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import Link from "next/link";
import {
  faExclamationCircle,
  faPlusCircle,
  faExternalLink,
} from "@fortawesome/free-solid-svg-icons";
import Portal from "./loginportal";
import AppConstant from "../connect/app_constants";
import axios from "axios";
const exclamationElement = (
  <FontAwesomeIcon
    icon={faExclamationCircle}
    className={`mx-auto ${styles.exclamationElement}`}
  />
);
const addElement = (
  <FontAwesomeIcon
    icon={faPlusCircle}
    className={`mx-auto ${styles.addElement}`}
  />
);
const externalElement = (
  <FontAwesomeIcon icon={faExternalLink} className={`mx-auto`} />
);
export default function DocumentRequest() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [document, setDocument] = useState([]);
  const [optionState, setOptionState] = useState("");
  if (AppConstant.isLogged) {
    const handleChange = (event) => {
      setOptionState(event.target.value);
    };
    const requestOptions = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        token: AppConstant.token,
      },
    };
    useEffect(() => {
      const fetchData = () => {
        fetch("http://localhost:3001/documentrequest", requestOptions)
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              setLoading(false);
              return response.json();
            } else {
              throw new Error("Error: Could not fetch the data");
            }
          })
          .then((posts) => {
            setDocument(posts.data);
          })
          .catch((e) => {
            setError(true);
            setLoading(false);
          });
      };
      fetchData();
    }, []);

    const connect = useCallback(async () => {
      axios
        .get("http://localhost:3001/documentrequest", {
          headers: {
            token: AppConstant.token,
          },
        })
        .then(function (response) {
          if (response.data.result == true) {
            setDocument(response.data.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
    if (loading) {
      return <h3>Loading ...</h3>;
    }

    if (error) {
      return <h3>Error in the API call itself ...</h3>;
    }
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          centered
          className={`mx-auto my-auto`}
        >
          <Modal.Header closeButton>
            <Modal.Title>Belge Talebi</Modal.Title>
          </Modal.Header>
          <form>
            <Modal.Body>
              <label htmlFor="tur">Belge T??r??</label>
              <select
                value={optionState}
                onChange={handleChange}
                id="tur"
                className={`form-select ${styles.itirazModal}`}
                required
              >
                <option disabled selected>
                  Belge t??r?? se??iniz
                </option>
                <option style={{ height: "28px" }} value="Askerlik Belgesi">
                  Askerlik Belgesi
                </option>
                <option value="Disiplin Cezas?? Durum Belgesi">
                  Disiplin Cezas?? Durum Belgesi
                </option>
                <option value="Disiplin Cezas?? Durum Belgesi E-??mzal??">
                  Disiplin Cezas?? Durum Belgesi E-??mzal??
                </option>
                <option value="Ge??ici Mezuniyet">Ge??ici Mezuniyet</option>
                <option value="Ge??ici Mezuniyet E-??mzal??">
                  Ge??ici Mezuniyet E-??mzal??
                </option>
                <option value="????renci Belgesi">????renci Belgesi</option>
                <option value="????renci Belgesi E-??mzal??">
                  ????renci Belgesi E-??mzal??
                </option>
                <option value="????renci Belgesi (??ngilizce)">
                  ????renci Belgesi (??ngilizce)
                </option>
                <option value="????renci Belgesi E-??mzal?? (??ngilizce)">
                  ????renci Belgesi E-??mzal?? (??ngilizce)
                </option>
                <option value="Transkript">Transkript</option>
                <option value="Transkript E-??mzal??">Transkript E-??mzal??</option>
                <option value="Transkript (??ngilizce)">
                  Transkript (??ngilizce)
                </option>
                <option value="Transkript E-??mzal?? (??ngilizce)">
                  Transkript E-??mzal?? (??ngilizce)
                </option>
              </select>
              <label htmlFor="yer">Verilecek Ki??i/Kurum</label>
              <input
                type="text"
                className={`form-control ${styles.itirazModal}`}
                id="tur"
              ></input>
              <label htmlFor="adet">Belge Adedi</label>
              <input
                type="text"
                className={`form-control ${styles.itirazModal}`}
                id="not"
              ></input>
            </Modal.Body>
            <Modal.Footer>
              <Link href="/documentrequest">
                <button
                  id="btn3"
                  onClick={(e) => {
                    axios
                      .post(
                        "http://localhost:3001/documentrequest",
                        {
                          tur: optionState,
                        },
                        {
                          headers: {
                            token: AppConstant.token,
                          },
                        }
                      )
                      .then(function (response) {
                        if (response.data.result == true) {
                          console.log("oook");

                          handleClose();
                          connect();
                          e.preventDefault();
                        }
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  }}
                  className={`button w-100 ${styles.button}`}
                >
                  {exclamationElement}
                  &nbsp; Belge Talebinde Bulun
                </button>
              </Link>
            </Modal.Footer>
          </form>
        </Modal>
        <Head>
          <title>Belge Talebi - ????C ??BS</title>
        </Head>

        <Layout
          appBar={{
            links: { "Ana Sayfa": "/", "Belge Talebi": "/documentrequest" },
            title: "Belge Talebi",
          }}
        >
          {" "}
          <div className={`my-auto mb-3 ${styles.talepBtn}`}>
            <button
              id="btn2"
              type="submit"
              className={`${styles.btn2}`}
              onClick={handleShow}
            >
              {addElement}
            </button>
          </div>
          <div className={`container ${styles.mainContainer}`}>
            <div style={{ textAlign: "center" }}>
              <div className={`row`} style={{ paddingTop: "0.5rem" }}>
                <div className={`col-3 my-auto ${styles.baslik}`}>No</div>
                <div className={`${styles.mycol} my-auto`}>
                  <div className={`${styles.verticalLine}`}></div>
                </div>
                <div className={`col-3 my-auto ${styles.baslik}`}>
                  Belge T??r??
                </div>
                <div className={`${styles.mycol} my-auto`}>
                  <div className={`${styles.verticalLine}`}></div>
                </div>
                <div className={`col-3 my-auto ${styles.baslik}`}>
                  Talep Tarihi
                </div>
                <div className={`${styles.mycol} my-auto`}>
                  <div className={`${styles.verticalLine}`}></div>
                </div>
                <div className={`col-2 my-auto ${styles.baslik}`}>Belge</div>
              </div>
            </div>

            <div className={`${styles.horizontalLine2}`}></div>
            {document.map((belge) => (
              <>
                <div className={`row ${styles.row}`}>
                  <div className={`col-3 my-auto ${styles.rows}`}>
                    {belge.ogrenciNo}
                  </div>
                  <div className={`${styles.mycol} my-auto`}>
                    <div className={`${styles.verticalLine}`}></div>
                  </div>
                  <div className={`col-3 my-auto ${styles.rows}`}>
                    {belge.belgeTuru}
                  </div>
                  <div className={`${styles.mycol} my-auto`}>
                    <div className={`${styles.verticalLine}`}></div>
                  </div>
                  <div className={`col-3 my-auto ${styles.rows}`}>
                    {belge.talepTarihi}
                  </div>
                  <div className={`${styles.mycol} my-auto`}>
                    <div className={`${styles.verticalLine}`}></div>
                  </div>
                  <div className={`col-2 my-auto ${styles.rows}`}>
                    <a
                      className={styles.download}
                      target="_blank"
                      href={belge.url}
                      download
                    >
                      Belge {externalElement}
                    </a>
                  </div>
                </div>
                <div className={`${styles.horizontalLine}`}></div>
              </>
            ))}
          </div>
        </Layout>
      </>
    );
  } else {
    return <Portal></Portal>;
  }
}
