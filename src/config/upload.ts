import path from 'path';
import multer from 'multer';
import { randomBytes } from 'crypto';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(rquest, file, callback) {
      const fileHash = randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;
      callback(null, filename);
    },
  }),
};
