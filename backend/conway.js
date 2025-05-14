import router from 'express'
import { createCanvas } from 'canvas';
import GIFEncoder from 'gifencoder';

let gameBoard = ""
const emptyBlock = "⚫"
const aliveBlock = "🦠" // "🟢"
const diedBlock = "🪦" // "🔴" // "🟥" 
const boardSize = 25
let boardStates = []

export const conway = router.Router()

function init_board(startingCells=100) {
	let blank = []
	for(let i = 0; i < boardSize*boardSize; i++)
		blank.push(0)
	for(let i = 0; i < startingCells; i++)
		blank[Math.floor(Math.random()*blank.length)] = 1
	boardStates = [[...blank]]
	return blank
}

const scale = 7
const canvas = createCanvas(boardSize*scale, boardSize*scale);
const ctx = canvas.getContext('2d');

function render_board() {
	let displayBoard = "" // "<style>* {border: 1px solid black;}</style>"
	for(let i = 0; i < boardSize; i++) {
		for(let j = 0; j < boardSize; j++) {
			displayBoard += "<span>"
			switch(gameBoard[i*boardSize+j]) {
				case 1:
					displayBoard += aliveBlock
					break
				case 0:
					displayBoard += emptyBlock
					break
				default:
					displayBoard += diedBlock
			}
			displayBoard += "</span>"
		}
		displayBoard += '<br/>'
	}
	return displayBoard
}

function count_live_neighbors(x, y) {
	let live = 0
	if(x > 0) {
		live += Boolean(gameBoard[(x-1)*boardSize+y])
		if(y > 0)
			live += Boolean(gameBoard[(x - 1)*boardSize+y-1])
		if(y < boardSize)
			live += Boolean(gameBoard[(x - 1)*boardSize+y+1])
	}
	if(x < boardSize) {
		live += Boolean(gameBoard[(x+1)*boardSize+y])
		if(y > 0)
			live += Boolean(gameBoard[(x + 1)*boardSize+y-1])
		if(y < boardSize)
			live += Boolean(gameBoard[(x + 1)*boardSize+y+1])
	}
	if(y > 0)
		live += Boolean(gameBoard[x*boardSize+y-1])
	if(y < boardSize)
		live += Boolean(gameBoard[x*boardSize+y+1])
	return live
}

function step() {
	let newBoard = [...gameBoard]
	for(let x = 0; x < boardSize; x++) {
		for(let y = 0; y < boardSize; y++) {
			if(isNaN(newBoard[x*boardSize+y]))
				newBoard[x*boardSize+y] = 0
			const neighbors = count_live_neighbors(x, y)
			if(gameBoard[x*boardSize+y] && (neighbors < 2 || neighbors > 3))
				newBoard[x*boardSize+y] = NaN
			if(gameBoard[x*boardSize+y] != 1 && neighbors == 3)
				newBoard[x*boardSize+y] = 1
		}
	}
	gameBoard = [...newBoard]
	boardStates.push([...gameBoard])
}

gameBoard = init_board()
conway.get("/", (req, res) => res.send(render_board()))
conway.get("/step", (req, res) => {
	step()
	if(req.query.gh)
		res.redirect("https://github.com/FlorianEagox")
	else
		res.send(render_board())
})
conway.get("/reset", (req, res) => {
	gameBoard = init_board()
	if(req.query.gh)
		res.redirect("https://github.com/FlorianEagox")
	else
	res.send(render_board())
})
function render_bitmap(board) {
	ctx.clearRect(0, 0, boardSize, boardSize)
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            switch(board[x*boardSize+y]) {
				case 1:
					ctx.fillStyle = '#00FF00'
					break
				case 0:
					ctx.fillStyle = '#000000'
					break
				default:
					ctx.fillStyle = '#FF0000'
			}
            ctx.fillRect(y*scale, x*scale, scale, scale);
			ctx.fillStyle = '#aaa'
			ctx.fillRect(y*scale, 0, 1, boardSize*scale)
        }
		ctx.fillStyle = '#aaa'
		ctx.fillRect(0, x*scale, boardSize*scale, 1)
    }
    return canvas.toBuffer('image/png');
}
conway.get("/bitmap", (req, res) => {
    res.setHeader('Content-Type', 'image/png');
	res.setHeader('cache-control', 'max-age=0, no-cache, no-store, must-revalidate')
    res.send(render_bitmap(gameBoard));
});
conway.get("/gif", async (req, res) => {
	let beep = new Promise((resolve, reject) => {
		const encoder = new GIFEncoder(boardSize*scale, boardSize*scale)
		encoder.start()
		const chunks = []
		const stream = encoder.createReadStream()
		stream.on('data', chunk => chunks.push(chunk))
		stream.on('end', () => resolve(Buffer.concat(chunks)))
		stream.on('error', () => reject('oopsiepoopsie'))
		encoder.setDelay(200)
		encoder.setRepeat(0)
		boardStates.forEach(state => {
			render_bitmap(state)
			encoder.addFrame(ctx)
		})
		encoder.finish()
	})
	
	res.setHeader('Content-Type', 'image/gif');
	res.setHeader('cache-control', 'max-age=0, no-cache, no-store, must-revalidate')
	res.send(await beep)
})