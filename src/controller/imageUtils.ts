import sizeOf from 'buffer-image-size'
import sharp from 'sharp'
import { Readable } from 'stream'
// There are not type supports currently here
const dropboxV2Api = require('dropbox-v2-api')
import util from 'util'
import logger from '../setUp/initLogger'

const SIZE_LONG_SIDE = parseInt(process.env.PICTURE_SIZE || '800')

const dropboxKey = process.env.DROPBOX_ACCESS_TOKEN
const dropbox = dropboxV2Api.authenticate({
  token: dropboxKey,
})
const dbSync = util.promisify(dropbox)

async function resizeImage(buffer: Buffer) {
  const { height, width } = sizeOf(buffer)
  let resizeOptions
  if (width > height) {
    resizeOptions = { width: SIZE_LONG_SIDE }
  } else {
    resizeOptions = { height: SIZE_LONG_SIDE }
  }
  const returnBuffer = await sharp(buffer)
    .resize(resizeOptions)
    .jpeg({ quality: 80 })
    .toBuffer()
  const { height: newHeight, width: newWidth } = sizeOf(returnBuffer)
  return [returnBuffer, newHeight, newWidth]
}

function bufferToStream(binary: Buffer) {
  const readableInstanceStream = new Readable({
    read() {
      this.push(binary)
      this.push(null)
    },
  })

  return readableInstanceStream
}

async function postPictureToDropbox(dropboxPath: string, fileStream: Readable) {
  const params = {
    resource: 'files/upload',
    parameters: {
      path: dropboxPath,
    },
    readStream: fileStream,
  }
  try {
    return await dbSync(params)
  } catch (err: any) {
    logger.error(err)
  }
}

async function generateShareableLink(dropboxPath: string): Promise<string> {
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
  }
  try {
    const sharedLinkResponse = await dbSync(params)
    let sharedUrl = sharedLinkResponse.url
    sharedUrl = sharedUrl.replace(/\?dl=0/, '?raw=1').replace(/&dl=0/, '&raw=1')
    return sharedUrl
  } catch (err: any) {
    logger.error(err)
    return ''
  }
}

async function deletePictureFromDropbox(dropboxPath: string) {
  const params = {
    resource: 'files/delete',
    parameters: {
      path: dropboxPath,
    },
  }
  try {
    return await dbSync(params)
  } catch (err: any) {
    logger.error(err)
  }
}

export {
  resizeImage,
  bufferToStream,
  postPictureToDropbox,
  generateShareableLink,
  deletePictureFromDropbox,
}
