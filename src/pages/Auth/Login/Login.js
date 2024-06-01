import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { LuMail } from "react-icons/lu";
import { BiLock } from "react-icons/bi";

export default function Login() {
  const [isProcessing, setIsProcessing] = useState(false)


  return (
    <div className="auth">
      <div className="container">
        <div className="row">
          {/* <h1>{[user.firstname]}</h1> */}
          <div className="col-12 col-md-8  col-lg-5  ">
            <div className="card p-2 p-md-3 p-lg-4 bg-transparent">
              {/* Headeing */}
              <div className="row mb-4">
                <div className="col">
                  <h3>LOGIN</h3>
                </div>
              </div>
              <form>
                {/* Email Input */}
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="email" className='mb-1 ms-1'>Email</label>
                    <Input size="large" className='bg-transparent' name='email' placeholder="Email" prefix={<LuMail size={18} />} />
                  </div>
                </div>
                {/* Password Input */}
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="password" className='mb-1 ms-1'>Password</label>
                    <Input.Password

                      size="large"
                      name='password'
                      className='bg-transparent'
                      placeholder="Password"
                      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      prefix={<BiLock size={18} />}
                    />
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col">
                    <button className='btn w-100' disabled={isProcessing}>
                      {
                        !isProcessing ? "Login"
                          :
                          <div className='spinner-border spinner-border-sm '></div>
                      }
                    </button>
                  </div>
                </div>
              </form>

              <div className="row mt-4">
                <div className="col">
                  <p className='text-center'>Create new account ? <Link to={'/auth/register'} className='btn btn-link'>REGISTER</Link></p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
