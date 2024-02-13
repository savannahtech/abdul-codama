import React, { useState } from 'react'

import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useAuth from '../hooks/useAuth'

import { signIn, confirmCode } from '../api'
import { ConfirmationCard } from '../components/Confirmation'

const loginFormSchema = yup.object({
  phoneNumber: yup.string().label('Phone Number').required().min(8),
})

type LoginFormData = yup.InferType<typeof loginFormSchema>

const LoginPage = () => {
  const { setIsAuth } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginFormSchema),
    mode: 'onChange',
  })

  const [processing, setProcessing] = useState(false)

  const [step, setStep] = useState(0)
  const [confirmationResults, setConfirmationResults] = useState(null)

  const onSubmit = async (data: LoginFormData) => {
    setProcessing(true)
    const t = toast.loading('Please wait...')
    const resp = await signIn(`${data.phoneNumber}`)
    toast.dismiss(t)
    setProcessing(false)
    if (resp.success) {
      toast.success('Confirmation code has been sent')
      setStep(1)
      setConfirmationResults(resp.confirmationResult)
    } else {
      toast.error(resp?.error)
      setTimeout(() => window.location.reload(), 400)
    }
  }

  const onConfirm = async (data: any) => {
    setProcessing(true)
    const t = toast.loading('Please wait...')
    const resp = await confirmCode(confirmationResults, data.verificationCode)
    toast.dismiss(t)
    setProcessing(false)
    if (resp.success) {
      setIsAuth(true)
    } else {
      toast.error(resp?.error)
    }
  }

  return (
    <div className="h-screen flex justify-center items-center p-3">
      <Card className="w-full md:w-[450px]">
        {step === 0 && (
          <>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login with your phone number</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Phone number</Label>
                    <Input
                      id="phoneNumber"
                      placeholder="Enter phone number eg. +233547204911"
                      {...register('phoneNumber')}
                    />
                    {errors?.phoneNumber?.message && (
                      <div className="text-[10px] text-red-400">
                        {errors.phoneNumber.message}
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="">
              <Button
                disabled={!isValid || processing}
                loading={processing}
                className="w-full"
                onClick={handleSubmit(onSubmit)}
              >
                Login
              </Button>
            </CardFooter>
          </>
        )}
        {step === 1 && (
          <ConfirmationCard
            processing={processing}
            onConfirm={onConfirm}
            onGoBack={() => {
              setStep(0)
            }}
          />
        )}
        <div id="recaptcha-container" className="absolute" style={{}}></div>
      </Card>
    </div>
  )
}

export default LoginPage
