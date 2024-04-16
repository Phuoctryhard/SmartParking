import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import LedApi from '../../../../Api/led'
import { toast } from 'react-toastify'
export default function Led() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getLed'],
    queryFn: LedApi.getLed
  })
  const updateLedMutate = useMutation({
    mutationFn: ({ id, body }) => LedApi.updatedLed(id, body)
  })
  const handleTurnLight = (index, status, element) => {
    console.log('Bật đèn ' + index + ' ' + status)
    updateLedMutate.mutate(
      { id: element._id, body: { status: true } },
      {
        onSuccess: (data) => {
          toast.success(`Bật ${element.name} thành công`)
        }
      }
    )
  }
  const handleoffLight = (index, status,element) => {
    status = false
    console.log('Tắt đèn ' + index + status)
    updateLedMutate.mutate(
      { id: element._id, body: { status: false } },
      {
        onSuccess: (data) => {
          toast.error(`Tắt ${element.name} thành công`)
        }
      }
    )
  }
  // console.log(data.data)
  if (isLoading) {
    return ''
  }
  return (
    <div className='w-full min-h-screen bg-[#E6EFFA] '>
      <div className='  p-10 '>
        <div className='w-full mx-auto text-center p-4'>
          <p className='font-bold text-blue-500 text-xl'>LED Smart</p>
        </div>
        <div className='grid grid-cols-1 gap-y-5'>
          {data.data &&
            data.data?.map((element) => {
              return (
                <div className='flex items-center justify-between p-3 bg-white rounded-2xl'>
                  <div className='flex items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      class='w-6 h-6 mr-3'
                    >
                      <path
                        stroke-linecap='round'
                        strokeLinejoin='round'
                        d='M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18'
                      />
                    </svg>
                    {element.name}
                  </div>
                  <div className='flex items-center '>
                    <button
                      className='p-2 bg-red-500 rounded-2xl mr-3'
                      onClick={() => handleTurnLight(element._id, element.status, element)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-6 h-6 text-white'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18'
                        />
                      </svg>
                    </button>
                    <button
                      className='bg-gray-200 rounded-2xl p-2 relative shadow-sm'
                      onClick={() => handleoffLight(element._id, element.status,element)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-6 h-6 '
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
