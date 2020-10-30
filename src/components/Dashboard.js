import React, { useState, useEffect } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import firebase from "../firebase"

export const emailList = new Set();

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const [studentList, setStudentList] = useState([])
  const [sessionsList, setSessionsList] = useState([])
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  const students = firebase.firestore().collection("students");
  // const sessions = firebase.firestore().collection("sessions");
  
  // function getSessions() {
  //   sessions.onSnapshot((querySnapshot) => {
  //     const items = [];
  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data());
  //     });
  //     setSessionsList(items);
  //   })
  // }

  function getStudents() {
    students.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setStudentList(items);
    })
  }
  
  useEffect(() => {
    getStudents();
  }, [])
  

  return (
    <>
      <h1 class="text-center mb-4" style={{color:"white"}}>HuzzahPlay</h1>
      <Card>
        <Card.Body>
          <h3 className="text-center mb-4">Students</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <table class="table table-sm table-striped" style={{textAlign: "center"}}>
            <thead>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((student) => (
                  emailList.add(student.['email']),
                <tr>
                  <td>{student.['first-name']}</td>
                  <td>{student.['last-name']}</td>
                  <td>{student.['email']}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/add-student" className="btn btn-primary w-100 mt-3" style={{backgroundColor: "#FF6B6B", borderColor:"transparent"}}>
            Add a student
          </Link>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <h3 className="text-center mb-4">Sessions</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <table class="table table-sm table-striped" style={{textAlign: "center"}}>
            <thead>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((student) => (
                  emailList.add(student.['email']),
                <tr>
                  <td>{student.['first-name']}</td>
                  <td>{student.['last-name']}</td>
                  <td>{student.['email']}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/add-student" className="btn btn-primary w-100 mt-3" style={{backgroundColor: "#FF6B6B", borderColor:"transparent"}}>
            Add a student
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}
