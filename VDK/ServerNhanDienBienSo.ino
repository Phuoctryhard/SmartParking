#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <SPI.h>
#include <MFRC522.h>
#include <MFRC522Extended.h>
#include <deprecated.h>
#include <require_cpp11.h>
#include <WiFiClientSecure.h>
#include <DHT.h>
ESP8266WebServer server(80);
const char* ssid = "iphone minh";
const char* password = "minh2609";
int LINE = D0;

#define DHTPIN D1
#define DHTTYPE DHT11

// #define LED 5  // D1
#define LOA D3
#define LED4 D2
#define L2 D4
#define alarmPin A0 
// khi gas 
int value = 0;
int toneVal = 0;
int gasThreshold = 500; // Default threshold value
int gasValue = 0; 
bool alertState = true; // Biến toàn cục để lưu trạng thái cảnh báo
DHT dht(DHTPIN, DHTTYPE);

#define SS_PIN D8
MFRC522 mfrc522(SS_PIN);
int UID[4], i;
String localhost = "http://192.168.255.131:4000";
void setup () {
  initialSerial();
  inititalRFID();
  connetToWifi();
  setupServerEndPoint();
  server.enableCORS(true); 
  server.begin();
  inititalRFID();
  initialLED();
  initialDHT();
  initialLoa();
}
 

void inititalRFID(){
  SPI.begin();
  mfrc522.PCD_Init();
}

void initialDHT(){
  dht.begin();  
}

void initialLED(){
  pinMode(LED4, OUTPUT);
  pinMode(L2, OUTPUT);
}
void initialLoa(){
  pinMode(LOA, OUTPUT);
}
void initialSerial(){
  Serial.begin(115200);
  delay(10);
  Serial.println();
  Serial.println();
}


void setupServerEndPoint(){
  server.on("/", HTTP_GET, renderHomeInterface);
  server.on("/message", HTTP_GET, SendMessage);
  server.on("/hongngoai", HTTP_GET, handlehongngoai);
  server.on("/xulivao", HTTP_GET, handleVao);
  server.on("/xulira", HTTP_GET, handleRa);
  server.on("/RFID", HTTP_GET, handleRFID);
  // server.on("/led3=on",handleLEDOn);
  // server.on("/led3=off", handleLEDOff);
  server.on("/led4=on",handleLEDOn4);
  server.on("/led4=off", handleLEDOff4);
  server.on("/led2=on",handleLEDOnhai);
  server.on("/led2=off", handleLEDOffhai);
  server.on("/dht/temp", handleTemp);
  server.on("/dht/hum", handleHum);
  server.on("/khiga", handleGas); // New endpoint for gas sensor
  server.on("/warning",HTTP_GET,setGasThreshold);
  server.on("/canhbao",HTTP_GET,canhbao);
}

void connetToWifi(){
  Serial.print("Connecting to ");
  Serial.print(ssid);
  WiFi.begin(ssid, password);

  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(" . ");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("Hostname: ");
  Serial.println(WiFi.hostname());
  Serial.print("Địa chỉ MAC của ESP Board: ");
  Serial.println(WiFi.macAddress());
}

String renderHTML(){
  String html = R"(=====
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wifi server</title>
</head>

<body>
    <h1>
        Welcome to Wifi Server of Esp8266
    </h1>
</body>

</html>
   =====)";
   return html;
}

void renderHomeInterface(){
  server.sendHeader("Content-Type", "text/html; charset=UTF-8");
  server.send(200, "text/html", renderHTML());
}

void handlehongngoai(){
  int value = digitalRead(LINE);
  if(value == 0){
    SendCommand(200, "start");
  }
  else if(value == 1){
    SendCommand(200, "Chưa có vật cản");
  }
}
void handleRFID(){
  String str_uid = "";
  // Phần còn lại của mã của bạn ở đây...
  if (!mfrc522.PICC_IsNewCardPresent()) {
  // Không có thẻ mới trong phạm vi đọc
  return;
  }
  // Có thẻ mới được phát hiện, đọc UID của thẻ
  if (!mfrc522.PICC_ReadCardSerial()) {
    return;
  }
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    UID[i] = mfrc522.uid.uidByte[i];
  }
  
  for (int i = 0; i < 4; i++) {
      str_uid += String(UID[i]); // Chuyển byte thành chuỗi hex và thêm vào str_uid
  }
  mfrc522.PICC_HaltA();// tạm ngừng đọc thẻ
  mfrc522.PCD_StopCrypto1();
  if(str_uid != ""){
    SendCommand(200, str_uid);
  }
}
String SerialCommand(){
  String command = "";
  do {
    if (Serial.available()) { // Kiểm tra xem có tin nhắn nào được gửi từ Serial Monitor hay không
      command = Serial.readString(); // Đọc tin nhắn
      Serial.println(command); // In tin nhắn ra Serial Monitor
    }
  } while (command.length() == 0); // Lặp lại cho đến khi nhận được một chuỗi không rỗng
  return command;
}

void SendHTTPRequest(String url){
  WiFiClient client;
  HTTPClient https;

  if (https.begin(client, url)) {
    int http_code = https.GET();
    https.end();
  }
}

void SendMessage(){
  String command = SerialCommand();
  server.sendHeader("Content-Type", "text/plain; charset=UTF-8");
  server.send(200, "text/plain", command);
}

void SendCommand(int httpcode, String command){
  server.sendHeader("Content-Type", "text/plain; charset=UTF-8");
  server.send(httpcode, "text/plain", command);
}
void handleVao(){
  Serial.println("Vao");
  SendCommand(200, "OK");
}
void handleRa(){
  Serial.println("Ra");
  SendCommand(200, "OK");
}

// void handleLEDOn() {
//   Serial.println("led on 5 "); // Xử lý bật đèn LED ở đây
//   digitalWrite(LED, HIGH);
//   server.send(200, "text/plain", "Đèn đã được bật");
// }
// void handleLEDOff() {
// Serial.println("led off 5 ");
// digitalWrite(LED, LOW); // Turn LED OFF 
// server.send(200, "text/plain", "Đèn đã được tắt");
// }

void handleLEDOn4() {
  Serial.println("led on 4 "); // Xử lý bật đèn LED ở đây
  digitalWrite(LED4, HIGH);
  server.send(200, "text/plain", "Đèn đã được bật");
}
void handleLEDOff4() {
Serial.println("led off 4 ");
digitalWrite(LED4, LOW); // Turn LED OFF 
server.send(200, "text/plain", "Đèn đã được tắt");
}
void handleLEDOnhai() {
  Serial.println("led on 2 "); // Xử lý bật đèn LED ở đây
  digitalWrite(L2, HIGH);
  server.send(200, "text/plain", "Đèn đã được bật");
}
void handleLEDOffhai() {
// Serial.println("led  off 2 ");
digitalWrite(L2, LOW); // Turn LED OFF 
server.send(200, "text/plain", "Đèn đã được tắt");
}
void handleTemp() {
// Đọc nhiệt độ từ cảm biên DHT
 float temperature = dht.readTemperature(); 
  if (isnan(temperature)) {
    server.send(500, "text/plain", "Lôi khi đọc nhiệt độ từ cảm biến");
  }else {
    server.send(200, "text/plain", String(temperature));
  }
  delay(1000);
}
void handleHum() {
// Đọc độ âm từ cảm biến DHT 
  float humidity = dht.readHumidity();
  if (isnan (humidity)) {
    server.send(500, "text/plain", "Lỗi khi đọc độ âm từ cảm biến");
  } else {
  server.send(200, "text/plain", String(humidity));
  }
}
void handleGas() {
  gasValue = analogRead(alarmPin);
  if (isnan(gasValue)) {
    server.send(500, "text/plain", "Lỗi khi đọc giá trị khí gas từ cảm biến");
  } else {
    server.send(200, "text/plain", String(gasValue));
  }
}
void setGasThreshold() {
  if (server.hasArg("threshold")) {
    gasThreshold = server.arg("threshold").toInt();
    Serial.println("New gas threshold set: " + String(gasThreshold));
    server.send(200, "text/plain", "Ngưỡng khí gas đã được đặt thành: " + String(gasThreshold));
  } else {
    server.send(400, "text/plain", "Thiếu tham số ngưỡng");
  }  
 
}
void canhbao() {
  if (server.hasArg("alert")) {
    String alertArg = server.arg("alert");
    Serial.println("check : "+alertArg);
    if (alertArg == "true") {
      alertState = true;
      Serial.println("True");
    } else if (alertArg == "false") {
      alertState = false;
      Serial.println("False");
    } else {
      server.send(400, "text/plain", "Giá trị tham số cảnh báo không hợp lệ");
      return;
    }

    Serial.println("Alert state changed: " + String(alertState));
    server.send(200, "text/plain", "Trạng thái cảnh báo đã được cập nhật: " + String(alertState));
  } else {
    server.send(400, "text/plain", "Thiếu tham số cảnh báo");
  }
}

void loop() {
  server.handleClient();
  if (gasValue > gasThreshold && alertState  && gasValue !=0) {
    digitalWrite(LOA, HIGH); // Example: Turn on loa
  } else if(gasValue < gasThreshold) {
    digitalWrite(LOA, LOW); // Example: Turn off loa
  }
  else if(gasValue > gasThreshold && !alertState){
      digitalWrite(LOA, LOW); // Example: Turn on loa
  }
}