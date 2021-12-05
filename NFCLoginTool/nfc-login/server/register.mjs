import { PythonShell } from 'python-shell';


export const print_cipher = async (text) => {
  function getCharCodes(s){
    let charCodeArr = [];
    
    for(let i = 0; i < s.length; i++){
        let code = s.charCodeAt(i);
        charCodeArr.push(code);
    }
    
    return charCodeArr;
}
  var plaintext = parseInt(getCharCodes(text), 10)

  let options = {
    mode: 'text',
      pythonOptions: ['-u'],
    scriptPath: './',
    args: plaintext,
  };


  const result = await new Promise((resolve, reject) => {
    PythonShell.run('printcipher.py', options, (err, results) => {
      if (err) return reject(err);
      // console.log(results)
      return resolve(results[0]);
    });
  });
  // console.log(result);
  return result
};

