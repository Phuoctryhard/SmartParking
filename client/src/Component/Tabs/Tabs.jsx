import React from 'react'
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react'
import App from '../Table/App'

export default function Tab1() {
  return (
    <div className='flex w-full flex-col'>
      <Tabs aria-label='Options'>
        <Tab key='photos' title='Biển số xe '>
          <Card>
            <CardBody>
             <App />
            </CardBody>
          </Card>
        </Tab>
        <Tab key='music' title='Bãi đổ '>
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur.
            </CardBody>
          </Card>
        </Tab>
        <Tab key='videos' title='Quản lí thiết bị'>
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  )
}
