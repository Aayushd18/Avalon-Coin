const assert = require("assert")
const num2bits = (num, bitLength) => {
  let bits = [];
  for(let i = 0; i < bitLength; i++) {
    bits.push(num & 1);
    num >>= 1
  }
  return bits;
}

const bits2num = (bits) => {
  let num = 0;
  bits.map((bit, index) => {
    assert(bit == 0 || bit == 1)
    num += (bit << index);
  });
  return num;
}


const updateRoundCounter = (counter) => {
  let t = 1 ^ counter[counter.length - 1] ^ counter[counter.length - 2];
  counter.pop()
  counter.splice(0, 0, t);
  return counter;
}

sbox = [[0, 1, 3, 6, 7, 4, 5, 2], 
 [0, 1, 7, 4, 3, 6, 5, 2],
 [0, 3, 1, 6, 7, 5, 4, 2],
 [0, 7, 3, 5, 1, 4, 6, 2]
];

const enc = (plaintext, long_key, short_key, block_bits = 48) => {
  let counter = [];
  if(block_bits === 48) {
    counter = [0, 0, 0, 0, 0, 0];
  }
  else if(block_bits === 96) {
    counter = [0, 0, 0, 0, 0, 0, 0];
  }
  else {
    console.error("Error: Invalid block_bits");
  }

  let text = num2bits(plaintext, block_bits)
  let round_key = num2bits(long_key, block_bits);
  let perm_key = num2bits(short_key, (block_bits * 2) / 3);

  let state = new Array(block_bits);
  for(let round = 0; round < block_bits; round++) {

    for(let i = 0; i <block_bits; i++) {
      text[i] ^= round_key[i];
    }

    for(let i = 0; i < block_bits - 1; i++) {
      state[(3 * i) % (block_bits - 1)] = text[i];
    }
    state[block_bits - 1] = text[block_bits - 1];

    counter = updateRoundCounter(counter);
    counter.map((bit, index) => {
      state[index] ^= bit;
    });

    for(let i = 0; i < (block_bits/3); i++) {
      let before = bits2num(state.slice((3 * i), (3 * i + 3)))
      let after = num2bits(sbox[bits2num(perm_key.slice((2*i), (2 * i + 2)))][before], 3);
      for(let j = 0; j < 3; j++) {
        text[3 * i + j] = after[j];
      }
    }
  }
  return bits2num(text);
}
function decimalToHexString(number)
{
  if (number < 0)
  {
    number = 0xFFFFFFFF + number + 1;
  }

  return number.toString(16).toUpperCase();
}

let plaintext = 0x4C847555C35B
let key = 0xC28895BA327B
let perm_key = 0x69D2CDB6

let ciphertext = enc(plaintext, key, perm_key);
console.log(decimalToHexString(ciphertext));

