import https from 'https';

https.get('https://avid-otter-1940.puter.site/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => { console.log(data); });
}).on('error', (err) => {
  console.error(err);
});
