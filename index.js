const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


const app = express()

app.use(morgan('tiny'));
app.use(cors())


app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    {
        "id":5,
        "name": "Jay",
        "number": "45445-51545"
    }

]

app.get('/api/info', (request, response) =>{
    let date = new Date()

    response.send(`<p>Phonebook as info for ${persons.length} people</p>
    <p>${date}</p>`)
})



app.get('/api/persons', (request, response)=>{
    response.json(persons)
})


app.get('/api/persons/:id', (request, response)=>{
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        response.send(person)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response)=>{
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateRandomId = () =>{
    const id = Math.floor(Math.random()*20000)
    return id;
}
const replicates = (name) =>{
     return persons.some(person=> person.name.toLowerCase() === name.toLowerCase())
}

app.post('/api/persons', (request, response)=>{
    const body = request.body

    if(!body.name || !body.number){
        return(response.status(400).json({
            error: 'content missing'
        }))
    }
    else if(replicates(body.name)){
        return(response.status(400).json({
            error: 'name must be unique'
        }))

    } else{
        const person = {
            name: body.name,
            number: body.number,
            id: generateRandomId(),
        }
    
        persons = persons.concat(person)
        response.json(person)

    } 

})

const PORT =  process.env.PORT|| 3001
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)

})

