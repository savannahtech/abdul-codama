import React, { useEffect, useState } from 'react'

import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { Label } from '../components/ui/label'
import { toast } from 'react-toastify'
import useAuth from '../hooks/useAuth'

import { auth, loadProfile, addProfile, signOut } from '../api'

import { UpdateProfileCard } from '../components/UpdateProfile'
import { Profile } from '../model'
import { ProfileSkeleton } from '../components/ProfileSkeleton'

const ProfilePage = () => {
  const { profile, setProfile, logout } = useAuth()

  const [processing, setProcessing] = useState(false)

  const [tab, setTab] = useState(0)

  const onSubmit = async (data: any) => {
    setProcessing(true)
    const t = toast.loading('Updating profile...')
    let profile_: Profile = { id: auth.currentUser?.phoneNumber, ...data }
    const resp = await addProfile({ ...profile_ })
    toast.dismiss(t)
    setProcessing(false)
    if (resp.success) {
      toast.success('Profile updated')
      setProfile({ ...resp.profile })
      setTab(0)
    } else {
      toast.success(resp?.error)
    }
  }

  const [state, setState] = useState({
    loading: false,
    error: '',
    loginOut: false,
  })

  const loadProfileData = async () => {
    setState({ ...state, loading: true, error: '' })
    const resp = await loadProfile(auth?.currentUser?.phoneNumber)
    if (!resp.success) {
      setState({ ...state, loading: false, error: resp?.error })
      return
    }
    if (resp.success && resp.profile) {
      setProfile({ ...resp.profile })
    } else {
      toast.warning('Please complete your profile!')
      setTab(1)
    }
    setState({ ...state, loading: false })
  }

  const logoutUser = async () => {
    setState({ ...state, loginOut: true })
    const resp = await signOut()
    if (!resp.success) {
      setState({ ...state, loginOut: false })
      toast.error(resp?.error)
      return
    }
    logout()
  }

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const unsubscribe = setTimeout(() => {
      setIsReady(true)
      if (!auth?.currentUser) return
      if (!profile?.email && !state.loading) {
        loadProfileData()
      }
    }, 100)

    return () => {
      clearTimeout(unsubscribe)
    }
  }, [auth?.currentUser])

  return (
    <div className="h-screen flex justify-center items-center p-3">
      <Card className="w-full md:w-[450px]">
        {state.loading || !isReady ? (
          <ProfileSkeleton />
        ) : state?.error ? (
          <div className="p-5 flex flex-col justify-center items-center">
            <div className="text-red-400 text-center mb-5">{state?.error}</div>
            <Button variant="outline" onClick={() => loadProfileData()}>
              Refresh
            </Button>
          </div>
        ) : tab === 0 ? (
          <>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Welcome!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1">
                  <Label className="text-gray-400">Name</Label>
                  <div className="text-[20px]">{profile?.name}</div>
                </div>
                <div className="flex flex-col space-y-1">
                  <Label className="text-gray-400">Email Address</Label>
                  <div className="text-[20px]">{profile?.email}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                className="bg-red-700"
                onClick={() => logoutUser()}
                loading={state.loginOut}
                disabled={state.loginOut || processing}
              >
                Logout
              </Button>
              <Button
                disabled={processing}
                loading={processing}
                className="bg-green-700"
                onClick={() => {
                  setTab(1)
                }}
              >
                Update Profile
              </Button>
            </CardFooter>
          </>
        ) : (
          tab === 1 && (
            <UpdateProfileCard
              profile={profile}
              processing={processing}
              onUpdate={(data: any) => {
                onSubmit(data)
              }}
              onGoBack={() => {
                if (!profile?.email || !profile?.name) {
                  toast.warning('Please provide profile info!')
                  return
                }
                setTab(0)
              }}
            />
          )
        )}
      </Card>
    </div>
  )
}

export default ProfilePage
