import React,{useState} from 'react'
import axios from 'axios'
export const Register = () => {
  const [firstName,setFirstName] = useState()
  const [lastName,setLastName] = useState()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [error,setError] = useState(null)

  const onSubmitHandler = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8080/new/user",{
    "firstName": firstName,
    "lastName": lastName,
    "email": email,
    "password": password
    })
    .then(res => {
      res.data.error ? 
      setError(res.data.error) :
      console.log(res)
    }).catch(err => console.error(err))

  }

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div>
          {
            error && 
            <h4>{error}</h4>
          }
        </div>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input type="text" onChange={(e) => setFirstName(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" onChange={(e) => setLastName(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="text" onChange={(e) =>setPassword(e.target.value)}/>
      </div>
      <div>
        <button>Submit</button>
      </div>
        </form>
    </div>
  )
}
