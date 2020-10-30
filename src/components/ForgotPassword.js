import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <>
      <h1 class="text-center mb-4" style={{color:"white"}}>HuzzahPlay</h1>
      <Card style={{color: "white", backgroundColor: "#4ECDC4", bordeerColor:"#1A535C"}}>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button style={{backgroundColor: "#FF6B6B", borderColor:"transparent"}} disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login" style={{color: "white"}}>Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2" style={{color: "white"}}>
        Need an account? <Link to="/signup" style={{color: "white", fontWeight: "bold"}}>Sign Up</Link>
      </div>
    </>
  )
}
