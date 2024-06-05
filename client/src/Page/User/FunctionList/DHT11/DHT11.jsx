import React, { useState } from 'react'
import anh from '../../../../Assets/image/hot.png'
import drop from '../../../../Assets/image/drop.png'
export default function DHT11() {
  // var espServer = "http://10.10.28.115";
  // var espServer = 'http://192.168.1.10'
  var espServer = 'http://192.168.1.31'
  const [temp, setTemp] = useState('')
  const [humid, setHumid] = useState('')
  const [khigas, setkhigas] = useState('')

  function getTemperature() {
    fetch(espServer + '/dht/temp')
      .then((response) => {
        console.log('Temperature:', response)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.text()
      })
      .then((data) => {
        console.log('Temperature:', data)
        // document.getElementById('temperature').innerText = 'Nhiệt độ: ' + data + ' C'
        setTemp(data)
      })
      .catch((error) => console.error('Error:', error))
  }
  function getHumidity() {
    fetch(espServer + '/dht/hum')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.text()
      })

      .then((data) => {
        console.log('Humidity:', data)
        // document.getElementById('humidity').innerText = 'Độ ẩm: ' + data + '%'
        setHumid(data)
      })
      .catch((error) => console.error('Error:', error))
  }
  function getKhigas() {
    fetch(espServer + '/khiga')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.text()
      })
      .then((data) => {
        console.log('khigas:', data)
        // document.getElementById('humidity').innerText = 'Độ ẩm: ' + data + '%';
        setkhigas(data)

        // Gửi dữ liệu lên server để kiểm tra
        return fetch('http://localhost:4000/check_gas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ gasValue: data })
        })
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((result) => {
        console.log('Server response:', result)
        if (result.alert) {
          alert('Gas level is too high! Fire alert!')
        }
      })
      .catch((error) => console.error('Error:', error))
  }

  function updateData() {
    getTemperature()
    getHumidity()
    getKhigas()
  }
  updateData()
  setInterval(updateData, 1000)
  return (
    <div className='mw-full h-[1000px] bg-gray-300 flex justify-center items-start '>
      <div className='p-5 bg-white mt-2 '>
        <h1 className='font-bold text-2xl'>Nhiệt độ & độ ẩm bãi đổ xe</h1>
        <p className='mt-5 text-xl'>
          <img src={anh} className='w-[30px] h-[30px] inline-block mr-5 mb-3' />
          Độ Ẩm : {humid} %
        </p>
        <p className='mt-5 text-xl'>
          <img src={drop} className='w-[30px] h-[30px] inline-block mr-5 mb-3' />
          Nhiệt Độ : {temp} ℃
        </p>
        <div className=''>
          <p>Cảnh báo cháy</p>
          <p>Value Khí gas : {khigas}</p>
        </div>
      </div>
    </div>
  )
}
