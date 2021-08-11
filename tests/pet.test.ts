import got from "got";
import {strict as assert} from 'assert';


describe('User can',()=>{
    let newPetId: number
    it('receive pet by his id', async ()=>{
        const response = await got('https://petstore.swagger.io/v2/pet/10')
        const body = JSON.parse(response.body)
        // console.log(body)

        assert(
            body.id == 10,
            `Expected API to return pet with id == 1, but got ${body.id}`
        )
    })
    it('create new pet', async ()=>{
        const response = await got.post('https://petstore.swagger.io/v2/pet',{
            json : {
                "id": 0,
                "category": {
                    "id": 0,
                    "name": "string"
                },
                "name": "doggie2",
                "photoUrls": [
                    "string"
                ],
                "tags": [
                    {
                        "id": 0,
                        "name": "string"
                    }
                ],
                "status": "available"
            }
        })
        const body = JSON.parse(response.body)
        newPetId = body.id
        // console.log(body)
        assert(
            body.name == 'doggie2',
            `Expected API return pet nam equal 'doggie2', but got ${body.name}`
        )
    })
    it('update exist pet', async ()=>{
        const response = await got.put('https://petstore.swagger.io/v2/pet',{
            json : {
                "id": newPetId,
                "category": {
                    "id": 0,
                    "name": "string"
                },
                "name": "doggie45",
                "photoUrls": [
                    "string"
                ],
                "tags": [
                    {
                        "id": 0,
                        "name": "string"
                    }
                ],
                "status": "available"
            }
        })
        const body = JSON.parse(response.body)
        // console.log(body)
        assert(
            body.name == 'doggie45',
            `Expected API return pet name equal 'doggie45', but got ${body.name}`
        )
    })
    it('delete exist pet', async ()=>{
        const response =
            await got.delete('https://petstore.swagger.io/v2/pet/'+newPetId.toString(),
                {
                    headers: {
                        'api_key': 'special-key'
                    }
                }
                )
        const body = JSON.parse(response.body)
        // console.log(body)
        assert(
            body.code == 200,
            `Expected API return code 200, but got${body.code}`
            )
        assert(
            body.message == newPetId.toString(),
            `Expected API return message == ${newPetId.toString()}, but got ${body.message}`
        )
    })
})