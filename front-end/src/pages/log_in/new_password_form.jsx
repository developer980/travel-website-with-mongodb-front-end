import React from 'react'
import { useState } from 'react'
import axios from "axios"
import ls from "localstorage-slim"
import Layout from '../../components/layout/layout'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'

ls.config.encrypt = true

export default function New_password_form() {

    // const { email } = useSelector(state => state.date)
    
    // console.log("email: " + email)
    console.log(ls.get('dest_eml'))
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(0)
    const token = useParams().token
    axios.post('https://mydestinationapp.onrender.com/verify_token', {
        email: ls.get('dest_eml'),
        token:token
    }).then((data) => {
        console.log("data retrieved")
        console.log(data.data)
        if (data.data) {
            ls.remove("dest_eml")
            setMessage(1)
        }
    })

    return (
        <Layout>
            
                {
                    message ?
                    <form className='user-form'>
                        <span className='field-name'>Insert your new password</span>
                        <input onChange = {(e) => setPassword(e.target.value)} id = "name" type="password" placeholder='Insert password'/>
                        
                        <button onClick={() => {
                            axios.post('https://mydestinationapp.onrender.com/reset_password', {
                                mail:ls.get('eml'),
                                password
                            }).then((data) => {
                                data.data && setMessage(1)
                            })
                                
                        }}>
                        </button>
                    </form>
                    :
                    <div className = 'error'>
                        <div className='negative-message'>
                            Token invalid or has expired          
                        </div>
                    </div>    
                }
            
        </Layout>
  )
}
