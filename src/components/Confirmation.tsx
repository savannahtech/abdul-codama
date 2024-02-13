import { Label } from '@radix-ui/react-label'
import React from 'react'
import { Button } from './ui/button'
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const confirmFormSchema = yup.object({
  verificationCode: yup.number().label('Confrimation Code').required(),
})

type ConfirmFormData = yup.InferType<typeof confirmFormSchema>

export const ConfirmationCard = ({ onConfirm, onGoBack, processing }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ConfirmFormData>({
    resolver: yupResolver(confirmFormSchema),
    mode: 'onChange',
  })

  return (
    <>
      <CardHeader>
        <CardTitle>Confirm Code</CardTitle>
        <CardDescription>
          Check your phone for confirmation code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Confirmation Code</Label>
              <Input
                id="verificationCode"
                placeholder="Enter confirmation code"
                {...register('verificationCode')}
              />
              {errors?.verificationCode?.message && (
                <div className="text-[10px] text-red-400">
                  {errors.verificationCode.message}
                </div>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <Button
            disabled={!isValid || processing}
            className="w-full"
            onClick={handleSubmit(onConfirm)}
          >
            Proceed
          </Button>
          <Button
            variant="outline"
            className="w-full mt-3"
            onClick={() => {
              window.location.reload()
            }}
          >
            Re-enter phone number
          </Button>
        </div>
      </CardFooter>
    </>
  )
}
