import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { emailList } from "./Dashboard"
import firebase from "../firebase"

function addstudent(firstname, lastname, email) {
    const student = firebase.firestore().collection("students"); 

    student
        .add({
            'first-name': firstname,
            'last-name': lastname,
            'email': email,
            'uid': ""
        })
}

export default function AddStudent() {
    const firstnameRef = useRef()
    const lastnameRef = useRef()
    const emailRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleAdd(e) {
        e.preventDefault()

        if (emailList.has(emailRef.current.value)) {
            return setError("Email already exists")
        }

        try {
            setError("")
            setLoading(true)
            await addstudent(firstnameRef.current.value, lastnameRef.current.value, emailRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to add a student")
        }

        setLoading(false)
    }

    return (
        <>
        <h1 class="text-center mb-4" style={{color:"white"}}>HuzzahPlay</h1>
        <Card style={{color: "#1A535C", borderColor:"#1A535C"}}>
            <Card.Body>
            <h2 className="text-center mb-4">Add a student</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleAdd}>
                <Form.Group id="first_name">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="input" ref={firstnameRef} required />
                </Form.Group>
                <Form.Group id="first_name">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="input" ref={lastnameRef} required />
                </Form.Group>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <div class="container">
                    <div class="text-center" style={{margin: "10px"}}>
                        <Button style={{backgroundColor: "#FF6B6B", borderColor:"transparent"}} disabled={loading} className="w-10" type="submit">
                            Add
                        </Button>
                    </div>
                    <div class="text-center">
                        <Link to="/">
                            <Button className="w-10" renderAs="button" style={{backgroundColor: "#FF6B6B", borderColor:"transparent"}}>
                                <span>Go Back</span>
                            </Button>
                        </Link>
                    </div>
                    
                </div>
            </Form>
            </Card.Body>
        </Card>
        
        </>
    )
}
