import useLoginModal from '@/hooks/useLoginModal'
import React, { useState, useCallback } from 'react'
import Input from './../Input'
import Modal from '../Modal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'

const LoginModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)

  const onToggle = useCallback(() => {
    if (isLoading) {
      return
    }

    loginModal.onClose()
    registerModal.onOpen()
  }, [isLoading, loginModal, registerModal])

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true)

      await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      toast.success('Logged in successfully')

      setLoading(false)
      loginModal.onClose()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [loginModal, email, password])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        type='password'
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
        First time using Twitter?{' '}
        <span
          onClick={onToggle}
          className="
          text-white
          cursor-pointer
          hover:underline"
        >
          Create an account
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
