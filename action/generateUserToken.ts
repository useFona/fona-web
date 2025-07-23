import { nanoid } from 'nanoid'

const generateUserToken = () => {
  return nanoid(8);
}

export default generateUserToken;
