const sizeOf = require('buffer-image-size');
const sharp = require('sharp');
const { Readable } = require('stream');
const dropboxV2Api = require('dropbox-v2-api');
const util = require('util');
const pino = require('pino');

const SIZE_LONG_SIDE = 800;
const logger = pino({ level: process.env.LOG_LEVEL || 'info', prettyPrint: true });

const dropboxKey = process.env.DROPBOX_ACCESS_TOKEN;
const dropbox = dropboxV2Api.authenticate({
  token: dropboxKey,
});
const dbSync = util.promisify(dropbox);

async function resizeImage(buffer) {
  const dimensions = sizeOf(buffer);
  const { height, width } = dimensions;
  let resizeOptions = { height: SIZE_LONG_SIDE };
  if (width > height) resizeOptions = { width: SIZE_LONG_SIDE };
  const ret = await sharp(buffer).resize(resizeOptions).toBuffer();
  return ret;
}

function bufferToStream(binary) {
  const readableInstanceStream = new Readable({
    read() {
      this.push(binary);
      this.push(null);
    },
  });

  return readableInstanceStream;
}

async function postPictureToDropbox(dropboxPath, fileStream) {
  const params = {
    resource: 'files/upload',
    parameters: {
      path: dropboxPath,
    },
    readStream: fileStream,
  };
  try {
    return await dbSync(params);
  } catch (err) {
    logger.error(err);
  }
}

async function generateShareableLink(dropboxPath) {
  const params = {
    resource: 'sharing/create_shared_link_with_settings',
    parameters: {
      path: dropboxPath,
      settings: {
        requested_visibility: 'public',
        audience: 'public',
        access: 'viewer',
      },
    },
  };
  try {
    return await dbSync(params);
  } catch (err) {
    logger.error(err);
  }
}

async function deletePictureFromDropbox(dropboxPath) {
  const params = {
    resource: 'files/delete',
    parameters: {
      path: dropboxPath,
    },
  };
  try {
    return await dbSync(params);
  } catch (err) {
    logger.error(err);
  }
}

module.exports = { resizeImage, bufferToStream, postPictureToDropbox, generateShareableLink, deletePictureFromDropbox };
