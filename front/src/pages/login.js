import React, {Component} from "react";
import "../css/style.css"
import {Button,Form,Alert} from "react-bootstrap";
import http from '../libs/http'
import globals from '../utilities/globals'

class Login extends Component {
    state = {
        userName: "",
        password: ""
    }

    handleChange=async e=>{
        await this.setState({
            ...this.state,[e.target.name]: e.target.value
        });
    }

    componentDidMount(){
        window.localStorage.clear()
    }

    Login=async()=>{
        let req = await http.post(`${globals.enlace}/usuario/login`,{
            userName: this.state.userName,
            password: this.state.password
        })
        if (!req.error) {
            alert(req.message)
            window.localStorage.setItem('id', req.result.id)
            window.localStorage.setItem('userName', req.result.userName)
            window.localStorage.setItem("nombre",req.result.nombre)
            window.localStorage.setItem("linkFotoPerfil",req.result.linkFotoPerfil)
            window.localStorage.setItem('rol', req.result.rol)
            if (req.result.rol === "admin") {
                window.location.href="./homeadmin"
            } else if (req.result.rol === "user") {
                window.location.href="./homeusuario"
            }
        } else {
            alert(req.message)
        }
    }

    render() {
        return (
            <div className="Main">
                <h2>Login</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Usuario: </Form.Label>
                        <Form.Control type="text" placeholder="Usuario" name="userName" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                    </Form.Group>
                    <br/>
                    <Button type="button" variant="primary" onClick={()=>this.Login()}>Ingresar</Button>
                    <br/>
                    <Alert variant="light">No tienes cuenta? <Alert.Link href="/registro">Registrarse</Alert.Link></Alert>
                </Form>
            </div> 
        )
    }
}

export default Login;