import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

function RegisterPage(props) {
    const dispatch = useDispatch()

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [PasswordConfirm, setPasswordConfirm] = useState("")
    const [Name, setName] = useState("")




    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onPasswordConfirmHandler = (event) => {
        setPasswordConfirm(event.currentTarget.value)
    }



    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log("Email", Email)
        console.log("Name", Name)
        console.log("PW", Password)
        console.log("PW Confirm", PasswordConfirm)

        if (Password !== PasswordConfirm) {
            return alert("비밀번호와 비밀번호 확인은 같아야 합니다.")
        }

        let body = {
            email: Email,
            name: Name,
            password: Password,
        }

        dispatch(registerUser(body))
            .then(response => {
                console.log(response)
                if (response.payload.success) {
                    props.history.push('/login')
                } else {
                    alert('Err')
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}></input>

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}></input>

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}></input>

                <label>Confirm Password</label>
                <input type="password" value={PasswordConfirm} onChange={onPasswordConfirmHandler}></input>

                <br></br>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
