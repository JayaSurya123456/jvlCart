import { useEffect, useState } from "react"
import { clearAuthError, login } from "../../src/actions/userActions"
import { useDispatch, useSelector } from "react-redux"
import { toast} from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function Login(){

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const dispatch=useDispatch()
    const navigate=useNavigate()

    //useSelector contain entire state globally i access authState state.authState
   const {loading,error,isAuthenticated} =useSelector(state =>state.authState)

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    }

    useEffect(()=>{
             if(isAuthenticated){
                navigate('/')
             }

             if(error){
                toast.error(error,{
                position: "bottom-center",
                //clearing previous error data if user type invalid credential error value stored in reducer
                //it show previous same error without click login page why becaue if(error) just show
                //so solution clearAuthError null the reducer value immediatly after showing error
            
                onOpen:()=>{dispatch(clearAuthError)}
             })
             return 
            }
    },[error,isAuthenticated,dispatch,clearAuthError])


   return <>
         <div className="row wrapper"> 
                <div className="col-10 col-lg-5">

                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mb-3">Login</h1>
                        <div className="form-group">
                        <label htmlFor="email_field">Email</label>
                        <input
                        onChange={e=>setEmail(e.target.value)}
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                        />
                        </div>
            
                        <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            onChange={e=>setPassword(e.target.value)}
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                        />
                        </div>

                        <button
                        id="login_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={loading}
                        >
                        LOGIN
                        </button>
      <Link to="/register" className="float-right mt-3">New User?</Link>
                    </form>
                </div>
            </div>
    </>
}
export default Login