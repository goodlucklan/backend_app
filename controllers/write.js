const writing = (write) => async (req, res) => {
    console.log(req.body);

}
module.exports = {
    writing: writing
}