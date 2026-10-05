Creado 4/10/2026
MacPorts 2.12.6
- Nodejs22:
sudo port selfupdate
sudo port install nodejs22
port search --name --glob 'npm*'
sudo port install npm9

- React - ESLint
npm create vite@latest . -- --template react