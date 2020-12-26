import React, { ChangeEvent, FormEvent, memo, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import fire from "../../config/fire";
import { LabelControl } from "../LabelControl";

const Login = ({ show, onHide }) => {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, name } = form;
    try {
      let { user } = await fire
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await user.updateProfile({ displayName: name });
    } catch (error) {}
  };
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Cadastrar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {["name", "email", "password"].map((e) => (
            <LabelControl
              key={e}
              label={e.charAt(0).toUpperCase() + e.slice(1)}
              id={e}
              type={e !== "name" ? e : "text"}
              value={form[e]}
              onChange={handleChange}
            />
          ))}
          <Button type="submit">Entrar</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <a>Link</a>
      </Modal.Footer>
    </Modal>
  );
};

export default memo(Login);
