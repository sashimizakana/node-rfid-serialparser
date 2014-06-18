/**
* Seeed Studio RFR101A1M用シリアルパーサ(node-serialportでつかうやつ)
* @author ばかおもちゃ本店(魚)
*/

var STX = 2;
var ETX = 3;

module.exports =
{
    parser:function()
    {
        var temp = [];
        var start = false;
        return function(emitter,buffer)
        {
            var b;
            for(var i = 0;i<buffer.length;i++)
            {
                b = buffer[i];

                //スタートビット
                if(b === STX)
                {
                    start = true;
                    continue;
                }

                //ストップビット
                if(b === ETX)
                {
                    start = false;

                    //チェックサム計算する
                    var sum = 0;
                    var check = temp.pop();
                    check = temp.pop() + check;
                    check = parseInt(check,16);
                    for(var j = 0;j<temp.length;j++)
                    {
                        if(j % 2 === 1)
                        {
                            sum ^= parseInt(temp[j - 1] + temp[j],16);
                        }
                    }

                    //チェックサム合ってたらemit（合ってなかったら無視する）
                    if(sum === check)
                    {
                        emitter.emit('data',temp.join(""));
                    }
                    temp = [];
                    continue;
                }

                if(start)
                {
                    temp.push(String.fromCharCode(b));
                }
            }
        };
    }
};