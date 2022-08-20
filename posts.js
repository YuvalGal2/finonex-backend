module.exports = function(app,axios){
    app.get('/api/posts', async (req,res) => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        res.send(response.data);
    })

}
