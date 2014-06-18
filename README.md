node-rfid-serialparser
======================

for SeeedStudio 125KHz RFID module

node-serialport用[SeeedStudioのRFR101A1M](http://www.seeedstudio.com/wiki/index.php?title=125Khz_RFID_module_-_UART)パーサ
チェックサムを計算して一致してたらRFIDのID部分を16進数文字列表記で返す
# いるもん
[voodootikigod/node-serialport](https://github.com/voodootikigod/node-serialport)

# つかいかた

```node
var parser = require('./rfid-serial').parser;
var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/tty-usbserial1", {
    baudrate: 9600
    ,parser:parser()
});
```