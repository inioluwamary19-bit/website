 // basic GET Request

 fetch('https://jsonplaceholder.typicode.com/users')
 .then(Response => {
    if(!Response.ok) {
        throw new Error('HTTP error! status: ${response.status}')
    }
    return Response.json();
 })


 .then (data =>{
    console.log(data)
    document.getElementById("output").innerHTML = data[1].name;
    document.getElementById("phone").innerHTML = data[2].phone


 })

    .catch (Error => {
        console.error(`fetch error`,error)
    })

 
    // ASYNC and AWAIT function
    async function fetchUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json()
            console.log(data);
        } catch (error) {
            console.error(`fetch error:`, error)
            
        }
    }
    fetchUsers()


    // POST
    async function createUsers(newUser){
        try {
            const response = fetch('https://jsonplaceholder.typicode.com/users'{
            method: "POST",
            Headers: {
                'content-Type': "application/json",

            },
            body: JSON.stringify(newUser),
        })
        if(!(await response).ok){
            throw new Error(`HTTP error ! ${( response).status}`)

        }
        const data = (await response).json();
        console.log(`user created &{data}`, data)

        } catch (error) {
            console.error(`POST error`, error)
        }
    }
    
    createUsers({name:"wale", email: "wale@gmail.com"});
    
 
 





