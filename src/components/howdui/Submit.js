import React, { useRef, useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import { database } from "../../firebase"
import { useAuth } from "../../contexts/AuthContext"

export default function AddPostButton() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const { currentUser } = useAuth()
  const titleRef = useRef()
  const contentRef = useRef()
  const idRef = useRef()

  function openModal() {
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
   
    database.posts.add({
      title: titleRef.current.value,
      //id: idRef.current.value,
      content: contentRef.current.value,
      userId: currentUser.uid,
      createdAt: database.getCurrentTimestamp(),
      likes: 0,
    }).then(() => {
      window.alert("you created a post!")
      window.location.reload();
    })
    setName("")
    closeModal()
  }


  return (
    <>
      <Button onClick={openModal} variant="outline-success" size="lg">
      Create a Post
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Create a Post</Modal.Title>
        </Modal.Header>
        
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                required
                ref={titleRef}
              />
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                required
                ref={contentRef}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Create Post
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
