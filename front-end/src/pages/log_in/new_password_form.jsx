import React from 'react'
import { useState } from 'react'
import axios from "axios"
import ls from "localstorage-slim"
import Layout from '../../components/layout/layout'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import bcrypt from "bcryptjs"

ls.config.encrypt = true

const salt = bcrypt.genSaltSync(10)

export default function New_password_form() {

    // const { email } = useSelector(state => state.date)
    
    // console.log("email: " + email)
    console.log(ls.get('dest_eml'))
    const [password, setPassword] = useState('')
    const [message, displayMessage] = useState(0)
    const [state, setState] = useState({
        message: 0,
        checked: 0
    })
    // const[checked, setStatus] = useState(0)
    const token = useParams().token
    !state.checked && axios.post('https://mydestinationapp.onrender.com/verify_user', {
        email: ls.get('dest_eml'),
        token:token
    }).then((data) => {
        console.log("data retrieved")
        console.log(data.data)
        if (data.data) {
            setState({
                message: 1,
                checked:1,
            })
           // console.log(data.data)
        }
    })

    return (
        <Layout>
            {
                state.message ?
                <form className='user-form'>
                    <span className='field-name'>Insert your new password</span>
                    <input onChange = {(e) => setPassword(e.target.value)} id = "name" type="password" placeholder='Insert password'/>
                    
                    <button onClick={(e) => {
                        e.preventDefault()
                        // const hashedpassword = bcrypt.hashSync(password)

                        axios.post('https://mydestinationapp.onrender.com/reset_password', {
                            email:ls.get('dest_eml'),
                            password
                        }).then((data) => {
                            data.data && displayMessage(1)
                            ls.remove("dest_eml")
                        })
                            
                    }}>Reset password
                    </button>
                    {
                        message ?
                            <div className = "message">
                                Your password has been changed!
                                You can now return to the <Link to = "/log_in">login page</Link>?
                            </div>
                            : null
                    }
                </form>
                :
                <form className='user-form'>
                    <span className='field-name'>Insert your new password</span>
                    <input onChange = {(e) => setPassword(e.target.value)} id = "name" type="password" placeholder='Insert password'/>
                    
                    <button onClick={(e) => {
                        e.preventDefault()
                        axios.post('https://mydestinationapp.onrender.com/reset_password', {
                            email:ls.get('dest_eml'),
                            password
                        }).then((data) => {
                            data.data && displayMessage(1)
                            ls.remove("dest_eml")
                        })
                            
                    }}>Reset password
                    </button>
                    <div className = "message-section">
                    {/* {
                        message ?
                            <div className = "message">
                                Your password has been changed!
                                You can now return to the <Link to = "/log_in">login page</Link>?
                            </div>
                            : null
                    } */}
                        <div className="message">
                            <span>
                                Your password has been changed!
                                You can now return to the <Link to = "/log_in">login page</Link>
                            </span>
                        </div>
                    </div>
                </form>
            }
            
        </Layout>
  )
}
