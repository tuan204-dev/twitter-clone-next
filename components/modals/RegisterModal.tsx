import useLoginModal from '@/hooks/useLoginModal'
import React, { useState, useCallback } from 'react'
import Input from './../Input'
import Modal from '../Modal'
import useRegisterModal from '@/hooks/useRegisterModal'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'

const RegisterModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)

  const onToggle = useCallback(() => {
    if (isLoading) {
      return
    }

    loginModal.onOpen()
    registerModal.onClose()
  }, [isLoading, loginModal, registerModal])

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true)
      console.log('im here 32')

      console.log(email, password, username, name)

      await axios.post('/api/register', {
        email,
        password,
        username,
        name,
      })

      setLoading(false)

      toast.success('Account created successfully')

      signIn('credentials', {
        email,
        password,
      })

      registerModal.onClose()
    } catch (error) {
      console.log('error 49')
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [registerModal, email, password, username, name])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?{' '}
        <span
          onClick={onToggle}
          className="
          text-white
          cursor-pointer
          hover:underline"
        >
          Sign in
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal
