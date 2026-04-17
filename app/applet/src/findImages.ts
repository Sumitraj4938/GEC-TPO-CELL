import https from 'https';

https.get('https://avid-otter-1940.puter.site/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const urls = data.match(/https?:\/\/[^"'\s]+\.(?:jpg|jpeg|png|gif|webp|svg)/gi);
    console.log('Found URLs:', urls);
  });
}).on('error', (err) => {
  console.error(err);
});
