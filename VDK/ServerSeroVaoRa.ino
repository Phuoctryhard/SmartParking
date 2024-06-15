#include <Servo.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2);
// Khai báo cổng PWM cho động cơ servo
const int servoVao = 8;
const int servoRa = 9;
int cambien1 = 10;
int cambien2 = 11;
int cambien3 = 7;
int cambien4 = 12;
int cambien5 = 6;
int cambien6 = 13;
#define trig_vao 3
#define echo_vao 2
long duration_vao;
long distance_vao;

#define trig_ra 5
#define echo_ra 4
long duration_ra;
long distance_ra;
// Khởi tạo đối tượng Servo
Servo myServoVao;
Servo myServoRa;

void setup() {
  // Khởi tạo cổng PWM cho động cơ servo
  pinMode(trig_vao, OUTPUT);
  pinMode(echo_vao, INPUT);
  pinMode(trig_ra, OUTPUT);
  pinMode(echo_ra, INPUT);
  myServoVao.attach(servoVao);
  myServoRa.attach(servoRa);
  Serial.begin(115200);
  initialLCD();
}

void initialLCD(){
 lcd.begin();
  lcd.backlight();
  pinMode(cambien1, INPUT);
  pinMode(cambien2, INPUT);
  pinMode(cambien3, INPUT);
  pinMode(cambien4, INPUT);
  pinMode(cambien5, INPUT);
  pinMode(cambien6, INPUT);
  // lcd.setCursor(0, 0);
  // lcd.print("1. K");
  // lcd.setCursor(0, 1);
  // lcd.print("2. K");
  // lcd.setCursor(6, 0);
  // lcd.print("3. K");
  // lcd.setCursor(12, 0);
  // lcd.print("5. K");
  // lcd.setCursor(6, 1);
  // lcd.print("4. K");
  //  lcd.setCursor(12, 1);
  // lcd.print("6. K");
  lcd.setCursor(0, 0);
  lcd.print("1. ");
  lcd.setCursor(0, 1);
  lcd.print("2. ");
  lcd.setCursor(6, 0);
  lcd.print("3. ");
  lcd.setCursor(6, 1);
  lcd.print("4. ");
  lcd.setCursor(12, 0);
  lcd.print("5. ");
  lcd.setCursor(12, 1);
  lcd.print("6. ");
}
void handleSieuAmVao(){
  digitalWrite(trig_vao, LOW);//Tắt chân trig_vao
  delayMicroseconds(2);
  digitalWrite(trig_vao,HIGH);//Bật chân trig_vao để phát xung
  delayMicroseconds(10);//Xung có độ rộng 10 microsecond
  digitalWrite(trig_vao,LOW);

  //Đo độ rộng của xung cao ở chân echo
  duration_vao = pulseIn(echo_vao, HIGH);
  //Tính khoảng cách
  distance_vao = (duration_vao * 0.034) / 2;
  Serial.print("Distance vao: ");
  Serial.println(distance_vao);
  if(distance_vao < 10){
    rotateServoVao(0);
  }
  delay(1000);
}

void handleSieuAmRa(){
  digitalWrite(trig_ra, LOW);//Tắt chân trig_ra
  delayMicroseconds(2);
  digitalWrite(trig_ra,HIGH);//Bật chân trig_ra để phát xung
  delayMicroseconds(10);//Xung có độ rộng 10 microsecond
  digitalWrite(trig_ra,LOW);

  //Đo độ rộng của xung cao ở chân echo
  duration_ra = pulseIn(echo_ra, HIGH);
  //Tính khoảng cách
  distance_ra = (duration_ra * 0.034) / 2;
  Serial.print("Distance ra: ");
  Serial.println(distance_ra);
  if(distance_ra < 10){
    rotateServoRa(0);
  }
  delay(1000);
}

void rotateServoRa(int angle){
  myServoRa.write(angle);
  delay(1000);      
}

void rotateServoVao(int angle){
  myServoVao.write(angle);
  delay(1000);      
}

void loop() {
  if (Serial.available()) {    
    String data = Serial.readStringUntil('\n');
    data.trim();
    Serial.println(data);
    if(data == "Ra"){
      rotateServoRa(90);
    }
    else if(data == "Vao"){
      rotateServoVao(90);
    }
  }
  // int giatri1 = digitalRead(cambien1);
  // int giatri2 = digitalRead(cambien2);
  // int giatri3 = digitalRead(cambien3);
  // int giatri4 = digitalRead(cambien4);
  // int giatri5 = digitalRead(cambien5);
  // int giatri6 = digitalRead(cambien6);
  // lcd.setCursor(3, 0);
  // lcd.print(giatri1 == 0 ? "C" : "K");

  // lcd.setCursor(9, 0);
  // lcd.print(giatri2 == 0 ? "C" : "K");

  // lcd.setCursor(3, 1);
  // lcd.print(giatri3 == 0 ? "C " : "K");

  // lcd.setCursor(9, 1);
  // lcd.print(giatri4 == 0 ? "C" : "K");

  // lcd.setCursor(15, 0);
  // lcd.print(giatri5 == 0 ? "C" : "K");

  // lcd.setCursor(15, 1);
  // lcd.print(giatri6 == 0 ? "C " : "K");
  int giatri1 = digitalRead(cambien1);
  int giatri2 = digitalRead(cambien2);
  int giatri3 = digitalRead(cambien3);
  int giatri4 = digitalRead(cambien4);
  int giatri5 = digitalRead(cambien5);
  int giatri6 = digitalRead(cambien6);

  lcd.setCursor(3, 0);
  lcd.print(giatri1 == 0 ? "C" : "K");

  lcd.setCursor(3, 1);
  lcd.print(giatri2 == 0 ? "C" : "K");

  lcd.setCursor(9, 0);
  lcd.print(giatri3 == 0 ? "C" : "K");

  lcd.setCursor(9, 1);
  lcd.print(giatri4 == 0 ? "C" : "K");

  lcd.setCursor(15, 0);
  lcd.print(giatri5 == 0 ? "C" : "K");

  lcd.setCursor(15, 1);
  lcd.print(giatri6 == 0 ? "C" : "K");

  // int giatri4 = digitalRead(cambien4);
  // lcd.setCursor(1, 15);
  // lcd.print(giatri4 == HIGH ? "Co  " : "Khong");
  handleSieuAmRa();
  handleSieuAmVao();
}