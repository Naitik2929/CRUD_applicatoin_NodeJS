const userdb = require('../model/model')
const validate = require('../model/model')

exports.create = async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let uemail = await userdb.findOne({ email: req.body.email })
    if (uemail)
        return res.status(400).send('That user already exisits!');
    else {
        const user = new userdb(req.body)
        await user
            .save(user)
            .then(data => {
                res.redirect('/add-user');
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating a create operation"
                });
            });
    }
}
exports.login = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }
    let uemail = await userdb.findOne({ email: req.body.email })
    if (uemail)
        return res.status(400).send(req.body.name + ' have successfully logged in.');
    else return res.status(400).send('That user not found');
}
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        userdb.findById(id)
            .then(data => {
                if (!data)
                    res.status(404).send({ message: 'Not found user with id' + id })
                else
                    res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error Occurred while retriving user information"
                });
            });
    }
    else {
        userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving user information" })
            })
    }
}

exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }
    const id = req.params.id;
    userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Error update uesr information' })
        })
}

exports.delete = (req, res) => {
    // if (!req.body) {
    //     return res
    //         .status(400)
    //         .send({ message: "Data to update can not be empty" })
    // }
    const id = req.params.id;
    userdb.findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete user with ${id}. Maybe user not found!` })
            } else {
                res.send({ message: "User was deleted successfully!" })
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete User with id=" + id })
        })
}