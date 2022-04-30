import React, {Component} from "react";
import "../css/style.css"
import {Nav,Container,Navbar,Form,Button,Tabs,Tab,Table} from "react-bootstrap";
import http from '../libs/http'
import globals from '../utilities/globals'

var reader = new FileReader();

class Homeadmin extends Component {
    state = {
        nombre: "",
        raza: "",
        tipo: "",
        sexo: "",
        descripcion: "",
        idmascad: "",
        animales: [],
        adopciones: []
    }

    handleChange=async e=>{
        await this.setState({
            ...this.state,[e.target.name]: e.target.value
        });
    }

    handleChange2=async e=>{
        await this.setState({
            ...this.state,[e.target.name]: e.target.value
        });
        this.GetAdopciones()
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
        if (window.localStorage.getItem("rol") !== "admin") {
            window.location.href="./"
        }
        this.setState({
            sexo: "Macho"
        })
        this.GetAnimales()
    }

    CerrarSesion() {
        window.localStorage.clear()
        window.location.href="./"
    }

    CrearMascota = async () => {
        if (this.state.nombre !== "" && this.state.raza !== "" && this.state.tipo !== "" && this.state.descripcion !== "") {
            let req = await http.post(`${globals.enlace}/mascota/createMascota`,{
                nombre: this.state.nombre,
                raza: this.state.raza,
                tipo: this.state.tipo,
                sexo: this.state.sexo,
                descripcion: this.state.descripcion,
                Base64FotoPerfil: reader.result.split(",")[1]
            })
            alert(req.mensaje)
        } else {
            alert("Faltan datos")
        }
    }

    GetAnimales=async()=>{
        let req = await http.get(`${globals.enlace}/mascota/getMascotasEnAdopcion`)
        if (req.error) {
            alert(req.message)
        } else {
            this.setState({
                animales: req.result
            })
        }
    }

    GetAdopciones=async()=>{
        if (this.state.idmascad !== "") {
            let req = await http.get(`${globals.enlace}/adopcion/getAdopcionByMascotaId/?IdMascota=${this.state.idmascad}`)
            if (req.error) {
                alert(req.message)
            }
            this.setState({
                adopciones: req.result
            })
        }
    }

    AprobarAdopcion=async(idusuario)=>{
        let req = await http.put(`${globals.enlace}/adopcion/aprobarAdopcionAUsuario`,{
            IdUsuario: idusuario,
            IdMascota: this.state.idmascad
        })
        alert(req.message)
        this.GetAdopciones()
    }

    render() {
        return (
            <div className="Main">

                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="/homeadmin">Administrador</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={()=>this.CerrarSesion()}>Cerrar Sesion</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Tabs defaultActiveKey="CrearMascota" className="mb-3">
                    <Tab eventKey="CrearMascota" title="Crear Mascota">
                        <Form>
                            <Form.Label>Nombre: </Form.Label>
                            <Form.Control type="text" placeholder="Nombre" name="nombre" onChange={this.handleChange}/>
                            <Form.Label>Raza: </Form.Label>
                            <Form.Control type="text" placeholder="Raza" name="raza" onChange={this.handleChange}/>
                            <Form.Label>Tipo: </Form.Label>
                            <Form.Control type="text" placeholder="Tipo" name="tipo" onChange={this.handleChange}/>
                            <Form.Label>Sexo: </Form.Label>
                            <Form.Control as="select" name="sexo" onChange={this.handleChange}>
                                    <option key="1" value="Macho">Macho</option>
                                    <option key="2" value="Hembra">Hembra</option>
                            </Form.Control>
                            <Form.Label>Descripcion: </Form.Label>
                            <Form.Control type="text" placeholder="Descripcion" name="descripcion" onChange={this.handleChange}/>
                            <Form.Label>Seleccionar Foto: </Form.Label>
                            <Form.Control type="file" name="fotomascota" onChange={this.handleImage} accept=".jpg,.png"/>
                            <br/>
                            <Button type="button" onClick={()=>this.CrearMascota()}>Crear</Button>
                        </Form>
                    </Tab>
                    <Tab eventKey="VerAdopciones" title="Adopciones">
                        <Form>
                            <Form.Label>Mascota: </Form.Label>
                            <Form.Control as="select" name="idmascad" onChange={this.handleChange2}>
                                    <option value=""></option>
                                    {
                                        this.state.animales.map((animal,index) => {
                                            return <option key={index} value={animal.id}>{animal.nombre}</option>
                                        })
                                    }
                            </Form.Control>
                            <br/>
                            <Table striped bordered hover responsive="sm" size="sm">
                                <thead>
                                    <tr>
                                        <th>Usuario</th>
                                        <th>Nombre</th>
                                        <th>Elegido</th>
                                        <th>Notificado</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.adopciones.map((adop, index) => (
                                        <tr key={index} value={adop.id}>
                                            <td>{adop.usuario.userName}</td>
                                            <td>{adop.usuario.nombre}</td>
                                            <td>{adop.elegido.toString()}</td>
                                            <td>{adop.notificado.toString()}</td>
                                            <td><Button value={adop.IdUsuario} onClick={e => this.AprobarAdopcion(e.target.value)}>Aprobar</Button></td>
                                        </tr>))
                                    }
                                </tbody>
                            </Table>
                        </Form>
                    </Tab>
                </Tabs>
            </div> 
        )
    }
}

export default Homeadmin;