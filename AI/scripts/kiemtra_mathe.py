from time import sleep
import subprocess
import requests
import sys
sys.path.insert(0, r'D:\Code_school_nam3ki2\SmartParking\MVC')
from models.biensoxe import Bienso
bs = Bienso()

def find_ip_by_mac(target_mac):
    # Sử dụng lệnh arp -a để lấy danh sách các thiết bị trong mạng local và thông tin ARP của chúng
    cmd = ['arp', '-a']
    returned_output = subprocess.check_output(
        cmd, shell=False, stderr=subprocess.STDOUT)
    decoded_output = returned_output.decode('utf-8')

    # Tìm kiếm địa chỉ IP dựa trên địa chỉ MAC
    lines = decoded_output.split('\n')
    for line in lines:
        if target_mac in line:
            ip = line.split()[0]
            return ip
    # Trả về None nếu không tìm thấy địa chỉ IP cho địa chỉ MAC đích
    return None

def send_to_esp8266_RFID(Mac_address):
    ip = find_ip_by_mac(Mac_address)
    if ip is None:
        print(f"Không thể tìm thấy địa chỉ IP cho địa chỉ MAC {Mac_address}")
        return None
    try:
        url = f"http://{ip}/xulira"
        response = requests.get(url)
        if response.status_code == 200:
            text = response.text
            return text
        else:
            print(f"Lỗi khi gửi dữ liệu: {response.status_code}")
            return None
    except Exception as e:
        print(f"Không thể kết nối đến ESP8266: {e}")
        return None
    
def get_mathe_from_esp8266(Mac_address):
    ip = find_ip_by_mac(Mac_address)
    if ip is None:
        print(f"Không thể tìm thấy địa chỉ IP cho địa chỉ MAC {Mac_address}")
        return None
    try:
        url = f"http://{ip}/RFID"
        response = requests.get(url)
        if response.status_code == 200:
            text = response.text

            print(f"text: {text}")
            return text
        else:
            print(f"Lỗi khi gửi dữ liệu: {response.status_code}")
            return None
    except Exception as e:
        return None

def KiemTraThe(Mac_address):
    print("Chờ tín hiệu kiểm tra thẻ từ ESP8266...")
    try:
        while True:
            mathe = get_mathe_from_esp8266(Mac_address)
            if mathe:
                mathe = mathe.strip()
                print(f"Mã thẻ: {mathe}")
                result = bs.getby_mathe(mathe)
                print(f"Kết quả: {result}")
                if result:
                    print("Nhận dạng thẻ thành công.")
                    while (True):
                        text = send_to_esp8266_RFID(Mac_address)
                        if text:
                            break
    except Exception as e:
        print(f"Đã xảy ra lỗi: {e}")
        
def KiemTraThe_2(Mac_address, mathe):
    try:
        if mathe:
            mathe = mathe.strip()
            result = bs.getby_mathe(mathe)
            print(f"Kết quả: {result}")
            if result:
                print("Nhận dạng thẻ thành công.")
                while (True):
                    text = send_to_esp8266_RFID(Mac_address)
                    if text:
                        break
    except Exception as e:
        print(f"Đã xảy ra lỗi: {e}")
        
KiemTraThe("84-f3-eb-75-b0-2e")