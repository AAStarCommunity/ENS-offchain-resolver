import { EnsDataModel } from './mongodb';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const EMPTY_CONTENT_HASH = '0x';
const ttl = 300;

export async function addr(name: string, coinType: number) {
  try {
    let addresses = await EnsDataModel.findOne({ node: name }, 'address');
    addresses = addresses?.address;
    let addr = ZERO_ADDRESS;
    // @ts-ignore
    if (addresses && addresses[coinType]) {
      // @ts-ignore
      addr = '' + addresses[coinType];
    }
    return { addr, ttl };

  } catch (e) {
    return { addr: ZERO_ADDRESS, ttl };
  }
}

export async function text(name: string, key: string) {
  try {
    const texts = await EnsDataModel.findOne({ node: name }, 'text');
    const text = texts?.text;
    console.log(text, 'text');

    // @ts-ignore
    if (text && text[key]) {   // @ts-ignore
      return { value: text[key], ttl };
    } else {
      return { value: '', ttl };
    }
  } catch (e) {
    return { value: '', ttl };
  }
}

export async function contenthash(name: string) {
  try {
    const contenthashRes = await EnsDataModel.findOne({ node: name }, 'contenthash');
    const contenthash = contenthashRes?.contenthash;
    console.log(contenthash, 'contenthash');

    if (contenthash) {
      return { contenthash: contenthash, ttl };
    } else {
      return { contenthash: EMPTY_CONTENT_HASH, ttl };
    }
  } catch (e) {
    return { contenthash: EMPTY_CONTENT_HASH, ttl };
  }
}
