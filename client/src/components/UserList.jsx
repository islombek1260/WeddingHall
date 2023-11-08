import { gql, useQuery } from "@apollo/client"
import Error404 from "./utils/Error404"
import Loading from "./utils/Loading"

const User = gql`
    query Users {
        users {
            username,
            password
        }
    }
    `
const Admin = gql`
    query Admins {
        halls {
            admin,
            hallname
        }
    }
    `

const UserList = () => {
    const { data: user_data, loading: user_loading, error: user_error } = useQuery(User)
    const { data: admin_data, loading: admin_loading, error: admin_error } = useQuery(Admin)

    if (user_error || admin_error) {
        return <div><Error404 /></div>;
    }

    if (user_loading || admin_loading) {
        return <div><Loading /></div>;
    }

    return (
        <>
            <div className="wrapper">
                <h2>Users List</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {user_data && user_data.users.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <th key={i}>{i + 1}</th>
                                    <td key={e.username}>{e.username}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table >
            </div>
            <div className="wrapper">
            <h3>Admin List</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>hall</th>
                            <th>id</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {admin_data && admin_data.halls.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <th key={i}>{i + 1}</th>
                                    <td key={e.hallname}>{e.hallname}</td>
                                    <td key={e.admin}>{e.admin}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table >
            </div>
        </>
    )
}

export default UserList