import React from 'react'
import { useState } from 'react'
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';

function Landing({ login, response, setResponse}) {
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <div>
      <div>
        {!openRegister && (
          <Login login={login} response={response} setResponse={setResponse} />
        )}

        {!openRegister && (
          <button onClick={() => setOpenRegister(true)}>
            Sing Up
          </button>
        )}

        <div>
          {openRegister && (
            <Register setOpenRegister={setOpenRegister} login={login} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Landing