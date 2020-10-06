rm -rf dist
npm run generate
rm -rf /home/seth/www/thefoxarmy.com/*
cp -r ./dist/* /home/seth/www/thefoxarmy.com/
