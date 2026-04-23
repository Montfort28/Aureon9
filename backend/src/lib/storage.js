import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { signToken, verifyToken } from './auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_ROOT = path.resolve(__dirname, '..', 'uploads');

function sanitizeName(fileName) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
}

export async function ensureUploadRoot() {
  await fs.mkdir(UPLOAD_ROOT, { recursive: true });
}

export async function createSignedUpload(input) {
  await ensureUploadRoot();
  const safeName = sanitizeName(input.fileName);
  const storageKey = path.posix.join(input.folder, `${Date.now()}-${safeName}`);
  const token = signToken({ storageKey, contentType: input.contentType, purpose: 'upload' });

  return {
    uploadUrl: `/api/documents/upload-binary?token=${token}`,
    fileUrl: `/uploads/${storageKey}`,
    storageKey,
    expiresIn: 3600,
  };
}

export async function writeUploadedBinary(token, buffer) {
  const payload = verifyToken(token);

  if (payload.purpose !== 'upload' || !payload.storageKey) {
    throw new Error('Invalid upload token');
  }

  const diskPath = path.join(UPLOAD_ROOT, payload.storageKey);
  await fs.mkdir(path.dirname(diskPath), { recursive: true });
  await fs.writeFile(diskPath, buffer);

  return {
    storageKey: payload.storageKey,
    diskPath,
  };
}

export { UPLOAD_ROOT };
