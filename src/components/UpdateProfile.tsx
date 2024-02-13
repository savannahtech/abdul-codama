import { Label } from '@radix-ui/react-label'
import React, { useEffect } from 'react'
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

const formSchema = yup.object({
  name: yup.string().label('Name').min(2).required(),
  email: yup.string().label('Email address').email().required(),
})

type ConfirmFormData = yup.InferType<typeof formSchema>

export const UpdateProfileCard = ({
  onUpdate,
  onGoBack,
  processing,
  profile,
}) => {
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors, isValid },
  } = useForm<ConfirmFormData>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    if (profile) {
      setValue('name', profile?.name, { shouldValidate: true })
      setValue('email', profile?.email, { shouldValidate: true })
    }
  }, [profile])

  return (
    <>
      <CardHeader>
        <CardTitle>Profile Info</CardTitle>
        <CardDescription>Add profile details</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                {...register('name')}
              />
              {errors?.name?.message && (
                <div className="text-[10px] text-red-400">
                  {errors?.name?.message}
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email Address</Label>
              <Input
                id="name"
                placeholder="Enter your email address"
                {...register('email')}
              />
              {errors?.email?.message && (
                <div className="text-[10px] text-red-400">
                  {errors?.email?.message}
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
            loading={processing}
            className="w-full"
            onClick={handleSubmit(onUpdate)}
          >
            SAVE
          </Button>
          <Button
            variant="outline"
            className="w-full mt-3"
            onClick={() => {
              onGoBack()
            }}
          >
            Cancel
          </Button>
        </div>
      </CardFooter>
    </>
  )
}
