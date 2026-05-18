import { useEffect, useState } from "react"
import { changePassword } from "../../src/actions/userActions"
import { useDispatch, useSelector } from "react-redux"

function UpdatePassword(){
const [oldPassword,SetoldPassword]=useState("")
const [password,SetPassword]=useState("")
const dispatch=useDispatch()

const {isUpdated,error}=useSelector(state =>state.authState)
const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(changePassword(oldPassword,password))
}


useEffect(()=>{
if(isUpdated){
    alert('succes')
    SetoldPassword("")
    SetPassword("")
}
if(error){
    alert(error)
}
},[isUpdated,error])

    return <>
    <h1>Change Password</h1>

    <form onSubmit={submitHandler}>
        <h3>OldPassword</h3>
<input value={oldPassword} onChange={(e)=>SetoldPassword(e.target.value)} type="password" />
        <h3>new password</h3>
<input value={password} onChange={(e)=>SetPassword(e.target.value)} type="password" />
    <br />
    <button>
        submit
    </button>
    </form>
    </>
}

export default UpdatePassword