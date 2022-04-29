import React, { Component } from "react";
import "../css/style.css"
import { Navbar, Nav, Container, Tab, Tabs, Carousel, Button, Modal, ListGroup, Form, Badge } from "react-bootstrap";
import http from '../libs/http'
import globals from '../utilities/globals'

class Homeusuario extends Component {
    state = {
        fotoperfil: "",
        animales: [],
        show: false,
        idan: "",
        nombrean: "",
        razaan: "",
        tipoan: "",
        sexoan: "",
        estadoan: "",
        linkfan: "",
        descan: "",
        lang: "",
        traduccion: "",
        audio64: "",
        notificaciones: [],
        tagsanimal: [],
        audio: ''
    }

    handleChange = async e => {
        await this.setState({
            ...this.state, [e.target.name]: e.target.value
        });
    }

    handleClose() {
        this.setState({
            show: false,
            idan: "",
            nombrean: "",
            razaan: "",
            tipoan: "",
            sexoan: "",
            estadoan: "",
            linkfan: "",
            descan: "",
            traduccion: "",
            audio: ""
        })
    }

    componentDidMount() {
        if (window.localStorage.getItem("rol") !== "user") {
            window.location.href = "./"
        }
        this.setState({
            fotoperfil: window.localStorage.getItem("linkFotoPerfil"),
            show: false
        })
        this.GetAnimales()
        this.GetAdopcionesUsuario()
    }

    CerrarSesion() {
        window.localStorage.clear()
        window.location.href = "./"
    }

    GetAnimales = async () => {
        let req = await http.get(`${globals.enlace}/mascota/getMascotasEnAdopcion`)
        if (req.error) {
            alert(req.message)
        } else {
            this.setState({
                animales: req.result
            })
        }
    }

    DetalleMascota = async (id, nombre, raza, tipo, sexo, estado, linkFotoPerfil, descripcion) => {
        this.setState({
            show: true,
            idan: id,
            nombrean: nombre,
            razaan: raza,
            tipoan: tipo,
            sexoan: sexo,
            estadoan: estado,
            linkfan: linkFotoPerfil,
            descan: descripcion,
        })
        let req = await http.post(`https://whf162fdv4.execute-api.us-east-1.amazonaws.com/primera`, {
            pathImage: linkFotoPerfil
        })
        if (req.error) {
            alert(req.message)
        } else {
            let etiquetas = []
            req.Labels.forEach(tag => {
                etiquetas.push(tag.Name)
            })
            this.setState({
                tagsanimal: etiquetas
            })
        }
    }

    Traducir = async () => {
        if (this.state.lang === "") {
            alert("No hay idioma seleccionado")
        } else {
            let req = await http.get(`${globals.enlace}/mascota/traducirMascotaDescription/?MascotaId=${this.state.idan}&Idioma=${this.state.lang}`)
            if (req.error) {
                alert(req.message)
            } else {
                this.setState({
                    traduccion: req.traduccion.TranslatedText
                })
            }
        }
    }

    LeerVoz = async () => {
        let req = await http.get(`${globals.enlace}/mascota/getMascotaDescriptionAudio/?MascotaId=${this.state.idan}`)
        this.setState({
            audio: req.audio
        })
        if (req.error) {
            alert(req.message)
        } else {
            this.setState({
                audio64: req.audio
            })
        }
    }

    Postularse = async () => {
        let req = await http.post(`${globals.enlace}/adopcion/createAdopcion`, {
            IdUsuario: window.localStorage.getItem("id"),
            IdMascota: this.state.idan
        })
        alert(req.message)
    }

    GetAdopcionesUsuario = async () => {
        let req = await http.get(`${globals.enlace}/adopcion/getAdopcionByUsuarioId/?IdUsuario=${window.localStorage.getItem("id")}`)
        if (req.error) {
            alert(req.message)
        } else {
            this.setState({
                notificaciones: req.result
            })
        }
    }

    Notificado = async (idnotif) => {
        await http.put(`${globals.enlace}/adopcion/notificacionVistaUsuario`, {
            idAdopcion: idnotif
        })
        alert("Disfrute de su nuevo animal")
        this.GetAdopcionesUsuario()
    }

    render() {
        return (
            <div className="Main">
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="/homeusuario">
                            <img alt="" src={this.state.fotoperfil} width="30" height="30" className="d-inline-block align-top" />{' '}
                            {window.localStorage.getItem("nombre")}
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link onClick={() => this.CerrarSesion()}>Cerrar Sesion</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Tabs defaultActiveKey="AnimalesDisponibles" className="mb-3">
                    <Tab eventKey="AnimalesDisponibles" title="Animales Disponibles">
                        <Carousel variant="dark">
                            {
                                this.state.animales.map((animal, index) => {
                                    return <Carousel.Item key={index}>
                                        <img src={animal.linkFotoPerfil} alt="imagen" />
                                        <Carousel.Caption>
                                            <h4>{animal.nombre}</h4>
                                            <br /><Button onClick={() => this.DetalleMascota(animal.id, animal.nombre, animal.raza, animal.tipo, animal.sexo, animal.estado, animal.linkFotoPerfil, animal.descripcion)}>Detalle</Button>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                })
                            }
                        </Carousel>

                        <Modal show={this.state.show} onHide={e => this.handleClose()}>
                            <img src={this.state.linkfan} alt="imagen" />
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    {
                                        this.state.tagsanimal.map((tag, index) => <Badge key={index} pill bg="primary">{tag}</Badge>)
                                    }
                                </ListGroup.Item>
                                <ListGroup.Item>Nombre: {this.state.nombrean}</ListGroup.Item>
                                <ListGroup.Item>Raza: {this.state.razaan}</ListGroup.Item>
                                <ListGroup.Item>Tipo: {this.state.tipoan}</ListGroup.Item>
                                <ListGroup.Item>Sexo: {this.state.sexoan}</ListGroup.Item>
                                <ListGroup.Item>Descripcion: {this.state.descan}</ListGroup.Item>
                                <ListGroup.Item>
                                    <Button onClick={() => this.LeerVoz()}>Escuchar Descripcion</Button>
                                    {
                                        this.state.audio == '' ?
                                            null
                                            :
                                            <audio autoPlay controls>
                                                <source src={`data:audio/mpeg;base64,${this.state.audio}`} />
                                            </audio>
                                    }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button onClick={() => this.Traducir()}>Traducir Descripcion</Button>
                                    <br />
                                    <Form.Control as="select" name="lang" value={this.state.lang} onChange={this.handleChange}>
                                        <option value=""></option>
                                        <option value="en">Inglés</option>
                                        <option value="de">Alemán</option>
                                        <option value="pt">Portugués</option>
                                        <option value="ja">Japonés</option>
                                    </Form.Control>
                                </ListGroup.Item>
                                <ListGroup.Item>Traduccion: {this.state.traduccion}</ListGroup.Item>
                            </ListGroup>
                            <Modal.Footer>
                                <Button variant="primary" onClick={() => this.Postularse()}>Postular por Adopcion</Button>
                                <Button variant="secondary" onClick={() => this.handleClose()}>Cerrar</Button>
                            </Modal.Footer>
                        </Modal>

                    </Tab>
                    <Tab eventKey="Notificaciones" title="Notificaciones">
                        <ListGroup>
                            {
                                this.state.notificaciones.map((notif, index) => {
                                    if (!notif.notificado) {
                                        return <ListGroup.Item key={notif.id}>
                                            <ListGroup horizontal>
                                                <ListGroup.Item>
                                                    Su solicitud de adopción de {notif.mascota.nombre} ha sido aprobada!
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Button onClick={() => this.Notificado(notif.id)}>Enterado</Button>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </ListGroup.Item>
                                    } else {
                                        return ""
                                    }
                                })
                            }
                        </ListGroup>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default Homeusuario;