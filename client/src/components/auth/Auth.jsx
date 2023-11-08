import { useMutation, gql } from "@apollo/client"
import "./style.css"
import Error404 from "../utils/Error404"
import Loading from "../utils/Loading"

const AUTH = gql`
mutation Mutation($username: String!, $password: String!) {
  signIn(username: $username, password: $password) {
    success
    data
    access_token
  }
}
`

const Auth = () => {
    const [signIn, { error, loading }] = useMutation(AUTH, {
        update: (_, data) => {
            if (data?.data) {
                const accessToken = data.data.signIn.access_token
                window.localStorage.setItem('token', accessToken)
                window.location.href = '/main'
            }
        }
    })

    if (error) return <><Error404 /></>
    if (loading) return <><Loading /></>

    const handlSubmit = e => {
        e.preventDefault()

        const { username, password } = e.target

        signIn({
            variables: {
                username: username.value,
                password: password.value
            }
        })

    }

    return (
        <>
            <h2>Sign in</h2>
            <form className="signin-form" action="" onSubmit={handlSubmit}>
                <input className="signin-input" name="username" type="text" autoComplete="on" placeholder="Username" />
                <input className="signin-input" name="password" type="password" autoComplete="on" placeholder="Password" />
                <button className="signin-button" type="submit" disabled={loading}>Sign In</button>
                <a className="signup-link" href="/signup">Sign Up</a>
            </form>
            
        </>
    )
}

export default Auth