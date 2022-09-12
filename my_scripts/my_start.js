function cmd (str_arr)
    {
        const [str, ...next_arr] = str_arr;//--- деструктурируем массив, забираем первую команду в str, остальное в next_arr
        const { exec } = require("child_process");
    
        const child = exec(str, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    
        child.on('exit', function() {
            console.log ("end step: " + str);
            if (next_arr.length>0)
            {
                cmd (next_arr);//--- рекурсивно вызываем следующую команду
            }
        });
    
    
    }
    
    //--- Готовим result.js (проводим транспиляцию), //--- запуск браузера
    cmd (
        [
            ".\\node_modules\\.bin\\webpack",
            ".\\dist\\index.html"
        ]);
