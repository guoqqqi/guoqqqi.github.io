const path = require('path');
const { default: scandir, defaultFilesystem } = require('sb-scandir');
const { readFileSync } = require('fs');
const markdownLinkExtractor = require('markdown-link-extractor');
const Downloader = require('nodejs-file-downloader');
const COS = require('cos-nodejs-sdk-v5');
const fs = require('fs');

const cos = new COS({
  SecretId: 'AKIDhEUUFl0ziBNIzPXOyGH2XliNls51f28w',
  SecretKey: 'Ypqa2D7j49yWnpa5JHyPZS3OTHn20h7H',
});

async function updateFile(filePath, prevLink, nextLink) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        resolve();
      }

      const result = data.replace(prevLink, nextLink);
      fs.writeFile(filePath, result, 'utf8', function (err) {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  });
}

async function upload(fileName, filePath) {
  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: 'api7-website-1301662268' /* 必须 */,
        Region: 'ap-guangzhou' /* 必须 */,
        Key: '202108/' + fileName /* 必须 */,
        StorageClass: 'STANDARD',
        Body: fs.createReadStream(filePath), // 上传文件对象
      },
      function (err, data) {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      },
    );
  });
}

async function handleLink(path, prevLink) {
  return new Promise(async (resolve, reject) => {
    let filename = '';

    const downloader = new Downloader({
      url: prevLink,
      directory: './downloads',
      onBeforeSave: (deducedName) => {
        filename = deducedName;
      },
    });

    try {
      await downloader.download();
      const filePath = `${__dirname}/downloads/${filename}`; // 本地文件路径
      const data = await upload(filename, filePath);

      const nextLink = `https://${data.Location}`;
      console.log({
        filename,
        prevLink,
        nextLink,
      });

      await updateFile(path, prevLink, nextLink);

      resolve();
    } catch (error) {
      console.log('Download failed', prevLink);
      resolve();
    }
  });
}

async function handleMarkdownFile(path) {
  return new Promise(async (resolve, reject) => {
    const fileData = readFileSync(path, { encoding: 'utf8' });
    const details = markdownLinkExtractor(fileData, true);
    const newDeatils = details.filter((e) => {
      return e.type === 'image';
    });
    console.log(path)

    for (let detail of newDeatils) {
      const prevLink = detail.href;

      if (
        // Filter list
        prevLink.startsWith('https://static.apiseven.com') ||
        prevLink.startsWith('../') ||
        prevLink.startsWith('https://gateway-api.sigs.k8s.io')
      ) {
        continue;
      }

      await handleLink(path, prevLink);
    }

    resolve()
  })
}

async function handleJSONFile(path) {
  return new Promise(async (resolve, reject) => {
    const langs = ["zh-CN", "en-US"]

    const prevData = JSON.parse(readFileSync(path, { encoding: 'utf8' }));
    let data = []

    for (const lang of langs) {
      if (prevData[lang]) {
        data = prevData[lang].map(item => item.logo || item.image)
      } else if (prevData["news"]) {
        data = prevData["news"][lang].map(item => item.logo || item.image)
      }
    }

    data = data.filter(Boolean)

    for (const prevLink of data) {
      if (
        prevLink.startsWith('https://static.apiseven.com') ||
        prevLink.startsWith('../') ||
        prevLink.startsWith('https://gateway-api.sigs.k8s.io')
      ) {
        continue;
      }

      await handleLink(path, prevLink);
    }
    resolve()
  })
}

async function replaceMarkdownLink(folderPath) {
  const result = await scandir(folderPath);

  for (let path of result.files) {
    if (path.endsWith('.md')) {
      await handleMarkdownFile(path)
    }

    if (path.endsWith('.json')) {
      await handleJSONFile(path)
    }
  }
}

// replaceMarkdownLink('/Users/guoqi/workspace/website/_posts/');
replaceMarkdownLink('/Users/guoqi/workspace/website/data/');
