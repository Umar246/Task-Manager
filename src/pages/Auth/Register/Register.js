import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from 'antd'
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { LuMail } from 'react-icons/lu';
import { BiLock } from 'react-icons/bi';

//_____________________________________________________________________________________________________________________________________


export default function Register() {
  const [isProcessing, setIsProcessing] = useState(false)
 
  return (
    <div className="auth">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 col-lg-5 ">
            <div className="card p-2 p-md-3 p-lg-4  bg-transparent">
              {/* Headeing */}
              <div className="row mb-4">
                <div className="col">
                  <h3>REGISTER</h3>
                </div>
              </div>
              <form >

                {/* UserName Input */}
                <div className="row mb-3">
                  <div className="col">
                    <label className='mb-1 ms-1'>Username</label>
                    {/* <input type="text" onChange={handleChange} className='form-control' placeholder='Username' name='name' /> */}

                    <Input size="large" className='bg-transparent' placeholder="Username" name='name'prefix={<UserOutlined size={18} />} />
                  </div>
                </div>

                {/* Email Input */}
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="email" className='mb-1 ms-1'>Email</label>
                    <Input size="large" name='email' className='bg-transparent' placeholder="Email" prefix={<LuMail size={18} />} />
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
                        !isProcessing ? "Register"
                          :
                          <div className='spinner-border spinner-border-sm '></div>
                      }
                    </button>
                  </div>
                </div>
              </form>

              <div className="row mt-4">
                <div className="col">
                  <p className='text-center'>Already have an account ? <Link to={'/auth/login'} className='btn btn-link'>LOGIN</Link></p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
