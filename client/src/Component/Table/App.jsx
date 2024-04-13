import React from 'react'
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
import { users } from './data'

export default function App() {
  const [page, setPage] = React.useState(1)
  const rowsPerPage = 6

  const pages = Math.ceil(users.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return users.slice(start, end)
  }, [page, users])
  const handleDelete = (value) => {
    console.log('xoa ' + value)
  }

  const handleEdit = (value) => {
    console.log('edit ' + value)
  }
  return (
    <div className=''>
      <div className=''>
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
      </div>

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
          <TableColumn key='role' className='text-center'>
            ROLE
          </TableColumn>
          <TableColumn key='status' className='text-center'>
            STATUS
          </TableColumn>
          <TableColumn key='active' className='text-center'>
            ACTION
          </TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.name} className='text-center'>
              {(columnKey) => (
                <TableCell>
                  {columnKey === 'active' ? (
                    <>
                      <button onClick={() => handleDelete(item.name)} className='p-3 bg-yellow-400 rounded-full'>
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
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z'
                          />
                        </svg>
                      </button>
                      <button onClick={() => handleEdit(item.name)} className='p-3 bg-yellow-400 rounded-full'>
                        <svg
                          class='w-8 h-8  text-orange'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <path
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
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
