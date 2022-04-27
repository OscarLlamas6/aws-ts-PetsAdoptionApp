import React, {Component} from "react";
import "../css/style.css"
import {Button,Form} from "react-bootstrap";
import http from '../libs/http'
import globals from '../utilities/globals'

var reader = new FileReader();

class Registro extends Component {
    state = {
        userName: "",
        password: "",
        confirmpass: "",
        nombre: "",
        Base64FotoPerfil: ""
    }

    handleChange=async e=>{
        await this.setState({
            ...this.state,[e.target.name]: e.target.value
        });
    }

    handleImage = async e => {
        reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            //BASE 64
            //console.log(reader.result);
        };
    }

    componentDidMount(){
        window.localStorage.clear()
    }

    Register = async () => {
        if (this.state.password === this.state.confirmpass) {
            let req = await http.post(`${globals.enlace}/usuario/createUser`,{
                userName: this.state.userName,
                password: this.state.password,
                nombre: this.state.nombre,
                Base64FotoPerfil: reader.result.split(",")[1]
            })
            alert(req.message)
        } else {
            alert("Las contraseñas no coinciden!")
        }
    }

    render() {
        return (
            <div className="Main">
                <h2>Registro</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Usuario: </Form.Label>
                        <Form.Control type="text" placeholder="Usuario" name="userName" onChange={this.handleChange}/>
                        <Form.Label>Nombre Completo: </Form.Label>
                        <Form.Control type="text" placeholder="Nombre Completo" name="nombre" onChange={this.handleChange}/>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                        <Form.Label>Confirmar Password: </Form.Label>
                        <Form.Control type="password" placeholder="Password" name="confirmpass" onChange={this.handleChange}/>
                        <Form.Label>Elegir Foto</Form.Label>
                        <Form.Control type="file" name="picture" onChange={this.handleImage} accept=".jpg,.png"/>
                    </Form.Group>
                    <br/>
                    <Button variant="primary" onClick={()=>this.Register()}>Registrar</Button>
                    <br/>
                    <br/>
                    <Button variant="primary" href="/">Regresar</Button>
                </Form>
            </div> 
        )
    }
}

export default Registro;