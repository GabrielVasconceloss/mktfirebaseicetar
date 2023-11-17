import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import './style.css';
 
const firebaseApp = initializeApp({
  apiKey: "AIzaSyCLH85Iy5VA7TfIUP5xMX6oBVICTls5Vt0",
  authDomain: "mkticeatr.firebaseapp.com",
  projectId: "mkticeatr",
});

export const App = () => {
  const [empresa, setEmpresa] = useState("");
  const [nomecomp, setNomecomp] = useState("");
  const [nomemanu, setNomemanu] = useState("");
  const [email, setEmail] = useState("");
  const [wpp, setWpp] = useState("");
  const [forms, setFoms] = useState([]);

  const db = getFirestore(firebaseApp);
  const formsCollection = collection(db, 'mkt');

  async function addForm(){
    const form = await addDoc(formsCollection, {empresa, nomecomp, nomemanu, email, wpp});
    console.log(form);
    
  }

  useEffect(()=> {
    const getForms = async () => {
      const data = await getDocs(formsCollection);
      setFoms(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
    getForms();
  },[]);

  return (    
    <div>
      <a href='https://api.whatsapp.com/send?phone=5511974636540'>
        <img
          src="wpp.png"
          alt="WhatsApp"
          className="whatsapp-icon"
        />
      </a>
      <form>
        <div className="logo-container">
          <a href='https://www.icetar.com.br/'>
            <img src="/logo192.png" alt="Logo" className="logo" hs />
          </a>
        </div>
        <h1>Solicite sua cotação</h1>
        <input type='text' placeholder='Nome da Empresa...' value={empresa} onChange={(e) => setEmpresa(e.target.value)}></input>
        <input type='text' placeholder='Responsável por Compras...' value={nomecomp} onChange={(e) => setNomecomp(e.target.value)}></input>
        <input type='text' placeholder='Responsável por Manutenção...' value={nomemanu} onChange={(e) => setNomemanu(e.target.value)}></input>
        <input type='text' placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <input type='text' placeholder='WhatsApp...' value={wpp} onChange={(e) => setWpp(e.target.value)}></input>
        <button type="submit" onClick={addForm}>Enviar</button>
      </form>
    </div>
  );
} 