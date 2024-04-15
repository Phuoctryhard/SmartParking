import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import UserApi from '../../Api/user'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export default function Login() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const Loginmutation = useMutation({
    mutationFn: (body) => UserApi.login(body)
  })
  const onSubmit = (data) => {
    console.log(data)
    Loginmutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data.data.user.role)
        toast.success('Login Thành công ')
        // user
        if (data.data.user.role === 'user') {
          navigate('/user')
        } else {
          navigate('/')
        }
      }
    })
  }

  return (
    <div className='bg-[#71bf44]'>
      <div className='max-w-7xl mx-auto px-4 '>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-25 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 bg-white rounded shadow-sm' onSubmit={handleSubmit(onSubmit)}>
              <div className='text-2xl'>Đăng Nhập</div>
              <div className='mt-8'>
                <input
                  placeholder='Email/Số điện thoại/ Tên đăng nhập'
                  type='text'
                  name='gmail'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm'
                  {...register('gmail')}
                ></input>
                <div className='mt-1 text-red-600 text-sm min-h-[1.5rem]'>{}</div>
              </div>

              <div className='mt-3'>
                <input
                  placeholder='Mật khẩu'
                  type='password'
                  name='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm'
                  {...register('password')}
                ></input>
                <div className='mt-1 text-red-600 text-sm min-h-[1.5rem]'></div>
              </div>

              <div className='mt-3'>
                <button
                  type='submit'
                  className='text-center bg-orange w-full p-3 capitalize text-white cursor-not-allowed font-semibold'
                >
                  Đăng nhập
                </button>
              </div>
              <div className='mt-4 flex justify-between text-[#05a]'>
                <span>Quên mật khẩu</span>
                <span>Đăng nhập với SMS</span>
              </div>
              <div className='flex items-center gap-2 mt-3'>
                <div className='h-[1px] grow bg-gray-200'></div>
                <span className='text-gray-500'>hoặc</span>
                <div className='h-[1px] grow bg-gray-200'></div>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                  <span className=' text-slate-400'>Bạn chưa có tài khoản SmartParking? </span>
                  <Link to='/Register' className='text-red-600 ml-1'>
                    Đăng Kí
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
