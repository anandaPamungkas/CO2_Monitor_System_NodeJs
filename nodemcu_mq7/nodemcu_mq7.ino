#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "MQ7.h"
 
//#define LED 2

MQ7 mq7(A0,5.0);
 
//Enter your wifi credentials
const char* ssid = "your_wifi_ssid";  
const char* password =  "your_wifi_password";
 
//Enter your mqtt server configurations
const char* mqttServer = "your_mqtt_server";    //Enter Your mqttServer address
const int mqttPort = 1883;       //Port number
const char* mqttUser = ""; //User
const char* mqttPassword = ""; //Password

String co2_str;
char co2[50];
 
WiFiClient espClient;
PubSubClient client(espClient);
 
void setup() {
  delay(1000);
  //pinMode(LED,OUTPUT);
  Serial.begin(115200);
 
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
  Serial.print("Connected to WiFi :");
  Serial.println(WiFi.SSID());
 
  client.setServer(mqttServer, mqttPort);
  client.setCallback(MQTTcallback);
 
  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
 
    if (client.connect("ESP8266", mqttUser, mqttPassword )) {
 
      Serial.println("connected");  
 
    } else {
 
      Serial.print("failed with state ");
      Serial.println(client.state());  //If you get state 5: mismatch in configuration
      delay(2000);
 
    }
  }
 
  client.publish("esp/mq7", "Hello from ESP8266");
  client.subscribe("esp/mq7");
 
}
 
void MQTTcallback(char* topic, byte* payload, unsigned int length) {
 
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
 
  Serial.print("Message:");
 
  String message;
  for (int i = 0; i < length; i++) {
    message = message + (char)payload[i];  //Conver *byte to String
  }
   Serial.print(message);
  //if(message == "#on") {digitalWrite(BUILTIN_LED,LOW);}   //LED on  
  //if(message == "#off") {digitalWrite(BUILTIN_LED,HIGH);} //LED off
 
  Serial.println();
  Serial.println("-----------------------");  
}
 
void loop() {
  client.loop();
  float concentration = mq7.getPPM();
  delay(1000);
  co2_str = String(concentration); //converting co2 ppm to float
  co2_str.toCharArray(co2, co2_str.length() + 1); //packaging up the data to publish to mqtt whoa...
  client.publish("esp/mq7", co2);
 
}
