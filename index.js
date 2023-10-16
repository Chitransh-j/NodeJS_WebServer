const http = require('http')

const PORT = 3000

//first create the server

const server = http.createServer()

const friends = [{
    id:0,
    name:'Nikola Tesla'
},
{
    id:1,
    name:'Issac Newton'
}
]

server.on('request',(req,res)=>{

    // this converts ".../friends/2" to ['...','friends','2']
    const items = req.url.split('/')

    if (req.method === 'POST' && items[1]==='friends'){

        //we write on the on required object whenever data event occurs.
        req.on('data',(data)=>{
            const newfriend = data.toString(); //data is in writable format i.e buffer form, So it must be converted to string.
            console.log(newfriend)
            friends.push(JSON.parse(newfriend));
           
        })
        req.pipe(res) //no need to end this req here.
    }

    else if ( req.method ==='GET' && items[1] === 'friends'){
        res.statusCode = 200
        res.setHeader('content-type','application/json')

        if (items.length === 3){
            const friendIndex = Number(items[2])
            res.end(JSON.stringify(friends[friendIndex]))

        }
        else{
            res.end(JSON.stringify(friends))
        }
    }


    else if ( req.method ==='GET' && items[1] === '/messages'){
        res.setHeader('Content-Type','text/html')
        res.write('<html>')
        res.write('<body>')
        res.write('<li>Hello</li>')
        res.write('<li>My name is Chitransh</li>')
        res.write('</ul>')
        res.write('</body>')
        res.write('</html>')
        res.end()
    }
    else{
        res.statusCode =404
        res.end()
    }
})

//now listen to it 

server.listen(PORT,()=>{
    console.log(`Hello ! We are listening on port no. ${PORT}....`)
})

