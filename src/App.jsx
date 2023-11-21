import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDocs, getFirestore, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import './style.css';
import { Analytics } from '@vercel/analytics/react';
 
const firebaseApp = initializeApp({
  apiKey: "AIzaSyCLH85Iy5VA7TfIUP5xMX6oBVICTls5Vt0",
  authDomain: "mkticeatr.firebaseapp.com",
  projectId: "mkticeatr",
});

export const App = () => {
  document.title = 'Icetar';
  const [empresa, setEmpresa] = useState("");
  const [nomecomp, setNomecomp] = useState("");
  const [nomemanu, setNomemanu] = useState("");
  const [email, setEmail] = useState("");
  const [wpp, setWpp] = useState("");
  const [forms, setFoms] = useState([]);
  const db = getFirestore(firebaseApp);
  const formsCollection = collection(db, 'mkt');
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState(null);

  async function addForm(){
    if (!empresa || !nomecomp || !nomemanu || !email || !wpp) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }else{
      setEnviado(true);
      console.log(enviado);
      const form = await addDoc(formsCollection, {empresa, nomecomp, nomemanu, email, wpp, data:serverTimestamp(), status:0});}
   
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
      {enviado ? (
              <div className='div-env'>
                <div className="logo-container">
                  <img src="/cheque.png" alt="Logo" className="cheque"/>
                </div>
                <h2>Cotação enviada!</h2>
              </div>
            ) : (
              <form>

                {erro && <div className="erro-message">
                  {erro}
                  <img src="/error.png" alt="Logo" className="cheque"/>
                  </div>}

                <div className="logo-container">
                  <a href='https://www.icetar.com.br/'>
                    <img src="/logo192.png" alt="Logo" className="logo"/>
                  </a>
                </div>
                <h1>Solicite sua cotação</h1>
                <input type='text' name="empresa" placeholder='Nome da Empresa...' required='true' value={empresa} onChange={(e) => setEmpresa(e.target.value)}></input>
                <input type='text' name="name" placeholder='Responsável por Compras...' required='true' value={nomecomp} onChange={(e) => setNomecomp(e.target.value)}></input>
                <input type='text' name="responsavel" placeholder='Responsável por Manutenção...' value={nomemanu} onChange={(e) => setNomemanu(e.target.value)}></input>
                <input type="email" name="email" placeholder='Email...' required='true' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="tel" name='tel' placeholder='WhatsApp...' required='true' value={wpp} onChange={(e) => setWpp(e.target.value)}></input>
                <button type="submit" onClick={addForm}>Enviar</button>
                <Analytics />
              </form>
              )}
    </div>
  );
} 