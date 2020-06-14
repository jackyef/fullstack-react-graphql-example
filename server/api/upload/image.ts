/* eslint-disable */
import { Application } from 'express';
import multer from 'multer';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import mimeTypes from 'mime-types';
import { ownerOnly } from '../../utils/acl';

const log = require('debug')('server/api/upload/image');

const ghRepoOwner = process.env['GITHUB_IMAGE_REPO_OWNER'] || '';
const ghRepoName = process.env['GITHUB_IMAGE_REPO_NAME'] || '';
const ghToken = process.env['GITHUB_ACCESS_TOKEN'] || '';
const baseHeaders = {
  Accept: 'application/vnd.github.v3+json',
  'Content-Type': 'application/json',
  Authorization: `token ${ghToken}`,
  'User-Agent': 'restaurant-reviews-upload-express',
};

const upload = multer();

// https://developer.github.com/v3/repos/contents/#create-or-update-file-contents
const githubUploadFileEndpoint = `https://api.github.com/repos/${ghRepoOwner}/${ghRepoName}/contents/:path`;

export const setupUploadAPIs = (app: Application) => {
  app.post(
    '/api/upload/image',
    ownerOnly,
    upload.single('file'),
    async (req, res) => {
      // receive a File from frontend and upload it to GitHub repo for storage
      try {
        const { file } = req;
        const ext = mimeTypes.extension(file.mimetype);
        const uniqueFilename = `${uuidv4()}.${ext}`;
        const base64Image = file.buffer.toString('base64');

        const response = await fetch(
          githubUploadFileEndpoint.replace(':path', uniqueFilename),
          {
            method: 'PUT',
            headers: baseHeaders,
            body: JSON.stringify({
              message: `chore: Upload file ${uniqueFilename}`,
              content: base64Image,
            }),
          },
        );

        const json = await response.json();
        const imageUrl = json?.content?.download_url;

        if (!imageUrl) {
          throw new Error('Failed to upload image to server');
        }

        res.status(200);
        res.send({
          imageUrl,
        });
      } catch (err) {
        res.status(500);
        res.send(err.message);
      }
    },
  );
};
