rm -rf dist
npm run generate
rm -rf /home/seth/www/sethpainter.com/*
cp -r ./dist/* /home/seth/www/sethpainter.com/
