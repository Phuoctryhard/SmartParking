/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue
} from '@nextui-org/react'
import { Link } from 'react-router-dom'
import BiensoxeApi from '../../Api/biensoxe'
import { useMutation } from '@tanstack/react-query'

export default function TableBien({ databienso }) {
  console.log('re - render ')
  const queryClient = useQueryClient()
  const [page, setPage] = React.useState(1)
  const rowsPerPage = 2

  console.log(databienso.data.data.length)
  const pages = Math.ceil(databienso.data.data.length / rowsPerPage)
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = Math.min(start + rowsPerPage, databienso.data.data.length)
    return databienso.data.data.slice(start, end)
  }, [page, databienso.data, rowsPerPage])

  const deleteBienSoMutate = useMutation({
    mutationFn: BiensoxeApi.deleteBienso,
    onSuccess: () => {
      toast.success('Thành công xóa ')
      queryClient.invalidateQueries({ queryKey: ['getBienso'] })
    }
  })
  const handleDelete = (id) => {
    console.log('xoa ' + id)
    deleteBienSoMutate.mutate(id)
  }

  const handleEdit = (value) => {
    console.log('edit ' + value)
  }

  return (
    <div className=''>
      <Link to='/create'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-10 h-10 text-green'
          style={{ padding: '10px', backgroundColor: 'lightgreen', borderRadius: '50%' }}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </Link>

      <Table
        aria-label='Example table with client side pagination'
        bottomContent={
          <div className='flex w-full justify-center  '>
            <Pagination
              isCompact
              showControls
              showShadow
              color='secondary'
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: 'min-h-[222px]'
        }}
      >
        <TableHeader>
          <TableColumn key='name' className='text-center'>
            NAME
          </TableColumn>
          <TableColumn key='mabien' className='text-center'>
            Mã Biển
          </TableColumn>
          <TableColumn key='_id' className='text-center'>
            STATUS
          </TableColumn>
          <TableColumn key='active' className='text-center'>
            ACTION
          </TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            // key là duy nhất 
            <TableRow key={item._id} className='text-center'>
              {(columnKey) => (
                <TableCell>
                  {columnKey === 'active' ? (
                    <>
                      <button onClick={() => handleDelete(item._id)} className='p-3 bg-yellow-400 rounded-full'>
                        <svg
                          className='w-8 h-8  text-gray-800 dark:text-white '
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z'
                          />
                        </svg>
                      </button>
                      <button onClick={() => handleEdit(item.name)} className='p-3 bg-yellow-400 rounded-full'>
                        <svg
                          className='w-8 h-8  text-orange'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z'
                          />
                        </svg>
                      </button>
                    </>
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
